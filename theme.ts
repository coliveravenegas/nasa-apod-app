import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#18181b',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#f4f4f5',
      contrastText: '#18181b',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#09090b',
      secondary: '#71717a',
    },
    error: {
      main: '#ef4444',
    },
    divider: '#e4e4e7',
  },
  typography: {
    fontFamily: '"Roboto"',
    body1: { color: '#09090b' },
    body2: { color: '#71717a' },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e4e4e7',
          boxShadow: 'none',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#09090b',
          boxShadow: 'none',
          borderBottom: '1px solid #e4e4e7'
        }
      }
    }
  }
});

export default theme;
