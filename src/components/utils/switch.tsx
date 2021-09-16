import React from 'react';

interface SwitchProps {
  test: any;
  children: JSX.Element | JSX.Element[];
}

interface CaseProps {
  value: any;
  children: React.ReactNode | React.ReactNode[];
}

interface SwitchType<T> extends React.FC<T> {
  Case: React.FC<CaseProps>;
  Default: React.FC<Omit<CaseProps, 'value'>>;
}

const Switch: SwitchType<SwitchProps> = ({ test, children }) => {
  let result: React.ReactNode = null;
  let otherwise;

  React.Children.forEach<React.ReactElement<CaseProps>>(children, child => {
    if (child.props.value === undefined) {
      otherwise = child;
    } else if (!result && child.props.value === test) {
      result = child;
    }
  });

  return result || otherwise;
};

Switch.Case = ({ children }) => <>{children}</>;
Switch.Default = ({ children }) => <>{children}</>;

export default React.memo(Switch);
