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

  if (String(token).trim().length > 0) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function onRejected(error: any, fnLogout: () => void) {
  if (!error?.response) {
    // eslint-disable-next-line no-alert
    alert('Não foi possível comunicar com o servidor.');
  } else {
    const { data } = error.response;

    if (data?.error) {
      const { status, name, message } = data.error;
      // eslint-disable-next-line no-alert
      alert(message);

      if (status === 401 && `${name}`.indexOf('UnauthorizedException') !== -1) {
        fnLogout();
      }
    }
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
