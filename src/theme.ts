import { createTheme, PaletteMode } from '@mui/material';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: `'Montserrat', sans-serif`,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            gap: '8px',
            textTransform: 'none',
          },
        },
      },
    },
  });
