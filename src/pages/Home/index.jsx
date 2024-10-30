import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppNavbar from '../../components/AppNavbar';
import SideMenu from '../../components/SideMenu';
import  Dashboard  from './Dashboard';
import Header from '../../components/Header';
import { Stack } from '@mui/material';
export default function Homepage() {

  return (
    <>
    <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <AppNavbar />
          <Stack direction="column" sx={{ gap: 1 }}>
            <Header page={'Home'}/>
            {/* Main content */}
            <Dashboard />
          </Stack>
          
        </Box>
    </>
  );
}