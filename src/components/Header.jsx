import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import MenuButton from "./MenuButton";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonIcon from "@mui/icons-material/Person";

export default function Header({ page }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  function handleLogout() {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%" },
        padding: 1.5,
        borderBottom: "2px solid #eceff1",
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs page={page} />
      <Stack direction="row" sx={{ gap: 1 }}>
        <MenuButton>
          <PersonIcon />
          <Typography variant="subtitle1">{user.userid}</Typography>
        </MenuButton>
        <MenuButton onClick={handleLogout}>
          <LogoutRoundedIcon />
        </MenuButton>
      </Stack>
    </Stack>
  );
}
Header.propTypes = {
  page: PropTypes.string.isRequired,
};
