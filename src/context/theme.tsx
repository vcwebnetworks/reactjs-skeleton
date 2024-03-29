import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { DefaultTheme, ThemeProvider } from 'styled-components';

import { ThemeMode } from '@/@types/styled';
import GlobalStyles from '@/styles/global';
import theme from '@/styles/theme';

export type AppThemeContextState = {
  theme: DefaultTheme;
  currentTheme: ThemeMode;
  toggleTheme(): void;
};

const AppThemeContext = createContext<AppThemeContextState>(
  {} as AppThemeContextState,
);

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeMode;
    if (storedTheme) return storedTheme;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
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

  const memorizedValue = React.useMemo(
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
    if (!window.matchMedia) return;
    const query = '(prefers-color-scheme: dark)';
    const matchMediaThemeDark = window.matchMedia(query);
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
    <ThemeProvider theme={memorizedValue.theme}>
      <AppThemeContext.Provider value={memorizedValue}>
        {children}
      </AppThemeContext.Provider>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export { AppThemeContext, AppThemeProvider };
