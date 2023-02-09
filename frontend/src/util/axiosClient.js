import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 401 || response.status === 422) {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
);
