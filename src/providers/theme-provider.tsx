import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createAppTheme } from '@/theme';

interface AppThemeProviderProps {
  children: ReactNode | ReactNode[];
}

function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={createAppTheme('light')}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
