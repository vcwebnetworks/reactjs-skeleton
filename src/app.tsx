import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ScrollReset from './components/ScrollReset';
import { StoreProvider } from './context/store';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes />
        <ScrollReset />
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
