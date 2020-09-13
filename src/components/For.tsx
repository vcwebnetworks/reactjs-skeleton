import React from 'react';

interface ForProps {
  rows: any[];

  children(value: any, index: number, array: any[]): React.ReactNode;
}

const For: React.FC<ForProps> = ({ rows, children }) => <>{rows.map(children)}</>;

export default For;
