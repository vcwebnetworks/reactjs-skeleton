/* eslint-disable no-alert */
import axios, { AxiosRequestConfig } from 'axios';

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

  const token = localStorage.getItem('authToken') || REACT_APP_API_BASE_TOKEN;

  if (token?.trim()) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function onRejected(error: any, fnLogout: () => void) {
  if (!error?.response) {
    alert('Desculpe, não foi possível comunicar com o servidor.');
  } else if (
    error.response.status === 401 &&
    ['token.invalid', 'token.expired'].includes(error.response.data.code)
  ) {
    alert('Sua sessão foi expirada, favor faça login novamente.');
    fnLogout();
  } else if (error.response.data?.stack) {
    alert(error.response.data.message);
  }

  return Promise.reject(error);
}

api.registerInterceptorWithLogout = (fnLogout: () => void): void => {
  api.interceptors.response.use(
    response => response,
    error => onRejected(error, fnLogout),
  );
};

api.interceptors.request.use(onRequestConfig, Promise.reject);

export default api;
