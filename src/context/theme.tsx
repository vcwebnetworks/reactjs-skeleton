import React, { createContext, useCallback, useState } from 'react';

import { DefaultTheme } from 'styled-components';

import { ThemeMode } from '~/@types/styled';
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
    return storedTheme ?? 'light';
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

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};

export { AppThemeContext, AppThemeProvider };
