import React from 'react';
import { RouteProps as RoutePropsDOM } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

export interface RouteProps extends RoutePropsDOM {
  auth?: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
