import React from 'react';
import { Router } from 'react-router-dom';

import history from '~/services/history';

import ScrollReset from './components/ScrollReset';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Routes />
      <ScrollReset />
    </Router>
  );
};

export default App;
