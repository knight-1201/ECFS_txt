
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MenuContent from './MenuContent';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  function handleLogout() {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          // backgroundColor: 'background.paper',
          backgroundColor: '#eceff1',
        },
      }}
    > 
    <MenuContent />
    </Drawer>
  );
}