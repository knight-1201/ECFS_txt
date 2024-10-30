import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from './components/Header';
import MainGrid from './components/MainGrid';

import { alpha } from '@mui/material/styles';
function Dashboard() {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        flexGrow: 1,
        backgroundColor: alpha(theme.palette.background.default, 1),
        overflow: 'auto',
      })}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          mx: 3,
          pb: 10,
          mt: { xs: 8, md: 0 },
        }}
      >
        <MainGrid />
      </Stack>
    </Box>
  )
}

export default Dashboard