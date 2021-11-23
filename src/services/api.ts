import { toast } from 'react-toastify';

import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import configApp from '@/config';
import authStorageService from '@/services/storage';

const {
  REACT_APP_API_ENDPOINT,
  REACT_APP_API_BASE_TOKEN,
  REACT_APP_API_METHOD_OVERRIDE,
} = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
});

function onRequestConfig(config: AxiosRequestConfig) {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }

  if (REACT_APP_API_METHOD_OVERRIDE === 'true') {
    const method = config.method?.toUpperCase() ?? 'GET';
    config.headers['X-Http-Method-Override'] = method;

    if (['PUT', 'DELETE', 'PATCH'].includes(method as string)) {
      config.method = 'POST';
    }
  }

  const token = authStorageService.getToken() || REACT_APP_API_BASE_TOKEN;

  if (token?.trim()) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function onRejected(error: any) {
  if (!error?.response) {
    toast.error('Sorry, it was not possible to communicate with the server.');
  } else if (
    error.response.status === 401 &&
    ['token.invalid', 'token.expired'].includes(error.response.data.code)
  ) {
    toast.error('Your session has expired, please log in again.');
    window.dispatchEvent(new Event(configApp.events.logoff));
  } else if (error.response.data?.stack) {
    toast.error(error.response.data.message);
  }

  return Promise.reject(error);
}

api.interceptors.response.use(response => response, onRejected);
api.interceptors.request.use(onRequestConfig, Promise.reject);

export default api;
