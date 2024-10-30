
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';

function SideMenuMobile({ open, toggleDrawer }) {
  function handleLogout() {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: '#eceff1',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '240px',
          minWidth: '240px',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, gap: 1, justifyContent: 'flex-end' }}>
          <MenuButton onClick={toggleDrawer(false)} >
            <CloseRoundedIcon size="large"/>
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={handleLogout}>
            登出
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
