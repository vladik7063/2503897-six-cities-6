import axios, { AxiosInstance } from 'axios';
import { getToken } from './token';
import { ApiConfig } from '../const/const';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiConfig.BaseUrl,
    timeout: ApiConfig.Timeout,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};
