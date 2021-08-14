import React, { lazy } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';

const MainPage = lazy(() => import('~/pages/Main'));

const Routes: React.FC = () => {
  const location = useLocation();

  return (
    <Switch>
      <Route exact path="/" component={MainPage} />

      <Redirect to={{ ...location, pathname: '/' }} />
    </Switch>
  );
};

export default Routes;
