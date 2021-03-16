import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ScrollReset from './components/ScrollReset';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
      <ScrollReset />
    </BrowserRouter>
  );
};

export default App;
