import React from 'react';

import App from './app';
import { AppThemeProvider, StoreProvider } from './context';

const Root: React.FC = () => {
  return (
    <AppThemeProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AppThemeProvider>
  );
};

export default Root;
