import { createTheme } from '@mui/material/styles';

export const GRADIENT = 'linear-gradient(135deg, #D4C5A9 0%, #6AA8D4 100%)';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C9B99A',
      light: '#DDD0BA',
      dark: '#A89070',
    },
    secondary: {
      main: '#5B9BC8',
      light: '#7AB3D9',
      dark: '#3F7AAD',
    },
    background: {
      default: '#0A0A0A',
      paper: '#131313',
    },
    text: {
      primary: '#EEEAE4',
      secondary: '#8A8078',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem',  fontWeight: 700 },
    h2: { fontSize: '2rem',    fontWeight: 700 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem',  fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem',    fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0A0A0A',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#131313',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#131313',
        },
      },
    },
  },
});

export default theme;
