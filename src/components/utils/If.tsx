import React from 'react';

interface IfProps {
  children: React.ReactNode;
  condition: boolean;
}

const If: React.FC<IfProps> = ({ children, condition }) => {
  if (condition) {
    return <>{children}</>;
  }

  return null;
};

export default React.memo(If);
