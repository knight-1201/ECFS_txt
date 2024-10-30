import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Stack from '@mui/material/Stack';
import CustomDatePicker from './CustomDatePicker';
import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonIcon from '@mui/icons-material/Person';

import Search from './Search';

export default function Header() {
  function handleLogout() {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        padding: 1.5,
        borderBottom: '2px solid #eceff1', 
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <MenuButton >
          <PersonIcon />
          <Typography variant="subtitle1">
          {'000580480'}
        </Typography>
        </MenuButton>
        <MenuButton onClick={handleLogout}>
          <LogoutRoundedIcon />
        </MenuButton>
      </Stack>
    </Stack>
  );
}