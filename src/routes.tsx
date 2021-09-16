import React, { Suspense } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';

import Route from '~/components/route';
import configApp from '~/config';

const Routes: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<p>loading route...</p>}>
      <Switch>
        {Object.values(configApp.routes).map(route => (
          <Route {...route} exact key={route.path} auth={route.auth ?? true} />
        ))}

        <Redirect from="*" to={{ ...location, pathname: '/' }} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
