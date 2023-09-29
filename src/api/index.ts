import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import config from '../config';

const instance = axios.create({
  baseURL: config.baseUrl,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

export default instance;
