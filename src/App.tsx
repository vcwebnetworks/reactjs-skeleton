import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import './config/reactotron';

import Routes from './routes';
import history from './routes/history';

import { store, persistor } from './store';

import { GlobalStyle } from './styles';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={5000} position="top-right" />
        </Router>
      </PersistGate>
    </Provider>
  );
}
