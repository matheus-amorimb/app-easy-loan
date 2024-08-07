import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/v2',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tokenJwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
