import { lazy } from 'react';

export const loadLazyPage = (path: string) =>
  lazy(() => import(`@/pages/${path}`));
