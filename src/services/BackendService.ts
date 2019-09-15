import axios, { AxiosResponse, AxiosError } from 'axios';

import { BACKEND_URL } from '../config/constants';

const backend = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function onFulFilled(response: AxiosResponse) {
  return response;
}

export function onRejected(error: AxiosError) {
  if (error.response) {
    return Promise.reject(error.response.data);
  }

  if (error.request) {
    return Promise.reject(error.request);
  }

  return Promise.reject(error);
}

backend.interceptors.response.use(onFulFilled, onRejected);

export default backend;
