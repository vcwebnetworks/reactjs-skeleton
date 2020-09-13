import React, { createContext, useState, useCallback } from 'react';

import * as themes from '~/styles/themes';

export type ThemeState = 'light' | 'dark';

export type AppThemeContextState = {
  theme: typeof themes.light;
  currentTheme: ThemeState;
  toggleTheme(): void;
};

const AppThemeContext = createContext<AppThemeContextState>({} as AppThemeContextState);

const AppThemeProvider: React.FC = ({ children }): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<ThemeState>(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeState;
    return storedTheme ? JSON.parse(storedTheme) : 'light';
  });

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', JSON.stringify(newTheme));

      return newTheme;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      currentTheme,
      toggleTheme,
      theme: themes[currentTheme],
    }),
    [currentTheme, toggleTheme],
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
};

export { AppThemeContext, AppThemeProvider };
