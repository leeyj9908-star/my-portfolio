import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const menus = [
  { label: 'Home',       path: '/' },
  { label: 'About Me',   path: '/about' },
  { label: 'Projects',   path: '/projects' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          Portfolio
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {menus.map((menu) => (
            <Button
              key={menu.path}
              color="inherit"
              onClick={() => navigate(menu.path)}
              sx={{
                fontWeight: location.pathname === menu.path ? 700 : 400,
                borderBottom: location.pathname === menu.path ? '2px solid white' : '2px solid transparent',
                borderRadius: 0,
              }}
            >
              {menu.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
