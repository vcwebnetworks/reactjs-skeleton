import { RouteProps } from '~/@types';
import { loadLazyPage } from '~/utils';

const configApp = {
  events: {
    logoff: 'user-logoff',
  },

  routes: [
    {
      path: '/',
      auth: false,
      component: loadLazyPage('home'),
    },
  ] as RouteProps[],
};

export default configApp;
