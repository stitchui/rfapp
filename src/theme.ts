import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#004d2c',
      dark: '#033928',
      light: '#0a5c38',
    },
    error: {
      main: '#d96a4a',
    },
    background: {
      default: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: 0,
        },
        containedPrimary: {
          backgroundColor: '#004d2c',
          '&:hover': { backgroundColor: '#0a5c38' },
          '&:disabled': { backgroundColor: '#004d2c', color: '#fff', opacity: 0.42 },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 6px 24px rgba(15,23,42,.14)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          margin: '0 6px',
          padding: '9px 11px',
          fontSize: 14,
          gap: 10,
          '&:hover': { backgroundColor: '#f8fafc' },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
          border: '1px solid #e0e0e0',
          boxShadow: '0 6px 24px rgba(15,23,42,.14)',
          minWidth: 160,
        },
        list: { padding: '6px 0' },
      },
    },
  },
});
