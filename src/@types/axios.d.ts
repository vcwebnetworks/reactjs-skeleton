import 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    registerInterceptorWithLogout(logout: () => void): void;
  }
}
