import axios from 'axios';

import config from '../utils/constant';

const instance = axios.create({
  baseURL: config.baseUrl,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

export default instance;
