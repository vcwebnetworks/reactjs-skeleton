import { useContext } from 'react';

import { AppThemeContext, AppThemeContextState } from '~/context/theme';

export function useAppTheme(): AppThemeContextState {
  return useContext(AppThemeContext);
}
