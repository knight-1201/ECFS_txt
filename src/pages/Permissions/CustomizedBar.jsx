import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import AddUser from "./AddUser";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteUser from "./DeleteUser";

function SearchIconButton({ handleSearch, searchID }) {
  return (
    <IconButton
      type="button"
      sx={{ p: "10px" }}
      aria-label="search"
      onClick={() => {
        handleSearch(searchID.current.value, false);
      }}
    >
      <SearchIcon />
    </IconButton>
  );
}
function ClearSearchIconButton({ handleSearch, searchID }) {
  return (
    <IconButton
      type="button"
      sx={{ p: "10px" }}
      aria-label="search"
      onClick={() => {
        handleSearch("", true);
        searchID.current.value = "";
      }}
    >
      <CancelIcon />
    </IconButton>
  );
}
export default function CustomizedBar({
  isAdmin,
  handleSearch,
  handleDelete,
  selected,
  handleAddPermissions,
}) {
  const searchID = React.useRef(null);

  return (
    <Stack>
      <Grid container spacing={{ xs: 1, md: 4 }}>
        <Grid item="true" size={{ xs: 6, md: 2 }}>
          {isAdmin ? (
            <DeleteUser handleDelete={handleDelete} selected={selected} />
          ) : null}
        </Grid>
        <Grid item="true" size={{ xs: 6, md: 2 }}>
          {isAdmin ? (
            <AddUser handleAddPermissions={handleAddPermissions} />
          ) : null}
        </Grid>

        <Grid item="true" size={{ xs: 12, md: 8 }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputBase
              inputRef={searchID}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search User_ID"
              inputProps={{ "aria-label": "search user" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            {searchID.current?.value ? (
              <ClearSearchIconButton
                handleSearch={handleSearch}
                searchID={searchID}
              />
            ) : (
              <SearchIconButton
                handleSearch={handleSearch}
                searchID={searchID}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
CustomizedBar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAddPermissions: PropTypes.func.isRequired,
};

ClearSearchIconButton.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchID: PropTypes.object.isRequired,
};
SearchIconButton.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchID: PropTypes.object.isRequired,
};
