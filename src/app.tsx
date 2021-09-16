import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ScrollReset } from '~/components/utils';
import { AppThemeProvider, StoreProvider } from '~/context';
import Routes from '~/routes';
import history from '~/services/history';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <StoreProvider>
        <AppThemeProvider>
          <BrowserRouter>
            <Routes />
            <ScrollReset />
            <ToastContainer position="top-right" />
          </BrowserRouter>
        </AppThemeProvider>
      </StoreProvider>
    </Router>
  );
};

export default App;
