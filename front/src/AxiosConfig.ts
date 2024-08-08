import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://18.231.175.178:4000/v2',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export function getToken(): string | null {
  const tokenData = localStorage.getItem('authToken');
  if (!tokenData) return null;
  const { token, timestamp } = JSON.parse(tokenData);
  const currentTime = new Date().getTime();
  if (currentTime - timestamp > 3600000) {
    localStorage.removeItem('authToken');
    window.location.reload();
    return null;
  }
  return token;
}

export function setToken(token: string) {
  const tokenData = {
    token,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem('authToken', JSON.stringify(tokenData));
}

export default axiosInstance;
