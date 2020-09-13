import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';

import MainPage from './pages/Main';

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
