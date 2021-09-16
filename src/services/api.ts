import { toast } from 'react-toastify';

import axios, { AxiosRequestConfig } from 'axios';

import configApp from '~/config';
import authStorageService from '~/services/storage';

const {
  REACT_APP_API_ENDPOINT,
  REACT_APP_API_BASE_TOKEN,
  REACT_APP_API_METHOD_OVERRIDE,
} = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
});

function onRequestConfig(config: AxiosRequestConfig) {
  if (REACT_APP_API_METHOD_OVERRIDE === 'true') {
    const method = config.method?.toUpperCase();
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
    toast.error('Desculpe, não foi possível comunicar com o servidor.');
  } else if (
    error.response.status === 401 &&
    ['token.invalid', 'token.expired'].includes(error.response.data.code)
  ) {
    toast.error('Sua sessão foi expirada, favor faça login novamente.');
    window.dispatchEvent(new Event(configApp.events.logoff));
  } else if (error.response.data?.stack) {
    toast.error(error.response.data.message);
  }

  return Promise.reject(error);
}

api.interceptors.response.use(response => response, onRejected);
api.interceptors.request.use(onRequestConfig, Promise.reject);

export default api;
