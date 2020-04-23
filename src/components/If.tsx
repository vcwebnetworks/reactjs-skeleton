import React from 'react';

export interface IfProps {
  children: React.ReactNode;
  condition: boolean;
  component?: React.ComponentType;
}

const If: React.FC<IfProps> = ({
  children,
  condition,
  component: Component = React.Fragment,
  ...rest
}) => {
  if (!condition) {
    return null;
  }

  return <Component {...rest}>{children}</Component>;
};

export default If;
