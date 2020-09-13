import { useContext } from 'react';

import { AppThemeContextState, AppThemeContext } from '~/context/theme';

export function useAppTheme(): AppThemeContextState {
  return useContext(AppThemeContext);
}
