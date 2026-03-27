import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B7355',
      light: '#A89070',
      dark: '#6B5840',
    },
    secondary: {
      main: '#C4A882',
      light: '#D4BFA0',
      dark: '#A08060',
    },
    background: {
      default: '#FAF7F2',
      paper: '#FFFDF9',
    },
    text: {
      primary: '#2C2416',
      secondary: '#7A6A55',
    },
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
  },
});

export default theme;
