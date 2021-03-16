import React, { createContext, useCallback, useEffect, useState } from 'react';

import { DefaultTheme, ThemeProvider } from 'styled-components';

import { ThemeMode } from '~/@types/styled';
import GlobalStyles from '~/styles/global';
import theme from '~/styles/theme';

export type AppThemeContextState = {
  theme: DefaultTheme;
  currentTheme: ThemeMode;
  toggleTheme(): void;
};

const AppThemeContext = createContext<AppThemeContextState>(
  {} as AppThemeContextState,
);

const AppThemeProvider: React.FC = ({ children }): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeMode;

    if (storedTheme) {
      return storedTheme;
    }

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // eslint-disable-next-line no-console
      console.log('using the operating system theme dark');

      return 'dark';
    }

    return 'light';
  });

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);

      return newTheme;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      currentTheme,
      toggleTheme,
      theme: {
        ...theme,
        mode: currentTheme,
        color: theme.colors[currentTheme],
      },
    }),
    [currentTheme, toggleTheme],
  );

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const matchMediaThemeDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    const handleChangeThemeInSystem = (event: MediaQueryListEvent) => {
      setCurrentTheme(event.matches ? 'dark' : 'light');
    };

    matchMediaThemeDark.addEventListener('change', handleChangeThemeInSystem);

    return () => {
      matchMediaThemeDark?.removeEventListener(
        'change',
        handleChangeThemeInSystem,
      );
    };
  }, []);

  useEffect(() => {
    document.body.dataset.theme = currentTheme;
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeProvider theme={value.theme}>
      <AppThemeContext.Provider value={value}>
        {children}
      </AppThemeContext.Provider>

      <GlobalStyles />
    </ThemeProvider>
  );
};

export { AppThemeContext, AppThemeProvider };
