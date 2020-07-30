import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router';

import MainPage from '../pages/Main';

const Routes: React.FC = () => {
  const location = useLocation();

  return (
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Redirect to={{ ...location, pathname: '/' }} />
    </Switch>
  );
};

export default Routes;
