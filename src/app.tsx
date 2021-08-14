import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';

import ScrollReset from '~/components/ScrollReset';
import Routes from '~/routes';
import history from '~/services/history';

import { AppThemeProvider, StoreProvider } from './context';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <AppThemeProvider>
        <StoreProvider>
          <Suspense fallback={<p>Carregando...</p>}>
            <Routes />
          </Suspense>

          <ScrollReset />
        </StoreProvider>
      </AppThemeProvider>
    </Router>
  );
};

export default App;
