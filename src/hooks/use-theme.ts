import { useContext } from 'react';

import { AppThemeContext, AppThemeContextState } from '@/context/theme';

export function useTheme(): AppThemeContextState {
  return useContext(AppThemeContext);
}
