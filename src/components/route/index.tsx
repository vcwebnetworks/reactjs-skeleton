import React, { useMemo } from 'react';
import { Redirect, Route as RouteDOM, useLocation } from 'react-router-dom';

import { RouteProps } from '~/@types';
import { useAuth } from '~/context';

const Route: React.FC<RouteProps> = ({
  auth = false,
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  if (auth && !isAuthenticated) {
    window.localStorage.setItem(
      '@login.redirect',
      window.btoa(
        `${location.pathname}${
          searchParams.toString().trim() ? `?${searchParams}` : ''
        }`,
      ),
    );

    return <Redirect to="/login" />;
  }

  if (!auth && isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <RouteDOM {...rest} render={props => <Component {...props} />} />;
};

export default Route;
