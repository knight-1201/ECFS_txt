import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppNavbar from "../../components/AppNavbar";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import MainGrid from "./MainGrid";
import { Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function DataManagement() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", maxHeight: "100vh" }}>
        <SideMenu />
        <AppNavbar />
        <Stack
          direction="column"
          sx={{ flexGrow: 1, width: "calc(100% - 240px)", maxWidth: "100vw" }}
        >
          <Header page={"Model Management"} />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: "auto",
              mx: 1,
              p: 1,
              mt: { xs: 9, md: 1 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            })}
          >
            <MainGrid />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
