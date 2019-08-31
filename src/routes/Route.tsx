import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '../views/_layouts/default';

export function RouteWrapper({
  component: Component,
  logged,
  ...rest
}: {
  [name: string]: any;
}) {
  const authenticated = false;

  if (!authenticated && logged) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={props => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  );
}
