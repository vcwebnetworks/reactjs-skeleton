import React from 'react';
import { Switch, Redirect, RouteProps } from 'react-router-dom';
import { RouteWrapper } from './Route';

export interface MyRouteProps extends RouteProps {
  logged?: boolean;
}

const routes: MyRouteProps[] = [
  {
    path: '/',
    exact: true,
    component: () => <h1>ReactJS + Typescript</h1>
  },
  {
    path: '/authenticated',
    exact: true,
    component: () => <h1>Authenticated</h1>,
    logged: true
  }
];

export default function() {
  return (
    <Switch>
      {routes.map((route, index) => (
        <RouteWrapper key={index} {...route} />
      ))}

      <Redirect from="*" to="/" />
    </Switch>
  );
}
