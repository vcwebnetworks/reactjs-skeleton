import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import LoadPage from '@/components/load-page';
import { ScrollReset } from '@/components/utils';

const routes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <LoadPage page="home" />,
  },
  {
    path: '/protected',
    element: <LoadPage page="protected-page" auth />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

const AppRoutes: React.FC = () => {
  const elementRoutes = useRoutes(routes);

  return (
    <>
      {elementRoutes}
      <ScrollReset />
    </>
  );
};

export default AppRoutes;
