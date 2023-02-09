import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { axiosClient } from '../util/axiosClient';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async (request, params) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const data = await request.formData();

  const userCredentials = {
    email: data.get('email'),
    password: data.get('password'),
  };

  try {
    if (mode !== 'login' && mode !== 'signup') {
      throw json({ message: 'Invalid mode' }, { status: 400 });
    }

    const response = await axiosClient.post(`/${mode}`, userCredentials);
    if (response.status === 200 || response.status === 201) {
      const token = response.data.token;
      localStorage.setItem('ACCESS_TOKEN', token);
      return redirect('/');
    }
    return response;
  } catch (error) {
    console.log(error);
    throw json({ message: 'Invalid credentials' }, { status: 401 });
  }
};
