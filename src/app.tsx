import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AppThemeProvider, AuthProvider, StoreProvider } from '@/context';
import Routes from '@/routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AuthProvider>
          <AppThemeProvider>
            <Routes />
          </AppThemeProvider>
        </AuthProvider>
      </StoreProvider>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
};

export default App;
