import axios from 'axios';
import cookies from 'js-cookie';
import refreshToken from './refreshToken';

const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
  headers: {
    Authorization: `Bearer ${cookies.get('token')}`
  }
});

privateAxios.interceptors.request.use(
  async (config) => {
    const token = cookies.get('token');
    if (token) {
      const expiryTime = new Date(cookies.get('expires'));
      if (expiryTime <= new Date()) {
        token = await refreshToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          throw new Error('Token refresh failed');
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Public Axios instance without token
const publicAxios = axios.create({
    baseURL: process.env.REACT_APP_API_ADDRESS,
    headers: {
        'Content-Type': 'application/json',
    },
});

export {privateAxios, publicAxios};
