import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }
    const logoutTimer = setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, 360000);

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [token]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

export const loader = () => {
  return localStorage.getItem('ACCESS_TOKEN');
};
