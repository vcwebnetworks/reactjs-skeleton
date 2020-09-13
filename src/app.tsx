import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import ScrollReset from './components/ScrollReset';
import { useAppTheme } from './hooks';
import Routes from './routes';
import GlobalStyles from './styles/global';

const App: React.FC = () => {
  const { theme } = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
        <GlobalStyles />
        <ScrollReset />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
