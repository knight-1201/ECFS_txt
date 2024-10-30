import * as React from "react";
import Box from "@mui/material/Box";
import CustomizedTable from "./CustomizedTable";
import TestBar from "./CustomizedBar";
import api from "../../utils/api";
export default function MainGrid() {
  const [permissions, setPermissions] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const role = JSON.parse(sessionStorage.getItem("user")).role;
  const isAdmin = role === "System_Admin";

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = permissions.map((n) => n.user_ID);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  async function fetchPermissions() {
    const data = await api.getPermissions();
    setPermissions(data);
  }
  async function handleSearch(id, isClear) {
    if (!id && !isClear) {
      alert("請輸入工號");
      return;
    }
    const data = await api.getPermissions();
    const newData = data.filter((item) => item.user_ID.includes(id));
    if (newData.length === 0) {
      alert("查無此工號");
      return;
    }
    setPermissions(newData);
  }
  async function handleAddPermissions(values) {
    try {
      const result = await api.postPermissions(values);
      setPermissions(result);
      alert("Add a new user successfully");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(selected) {
    const ids = selected.join(",");
    try {
      const result = await api.deletePermissions(ids);
      setPermissions(result);
      setSelected([]);
    } catch (error) {
      const data = await api.getPermissions();
      setPermissions(data);
      setSelected([]);
      alert(error.message);
    }
  }
  React.useEffect(() => {
    fetchPermissions();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TestBar
        isAdmin={isAdmin}
        handleSearch={handleSearch}
        handleDelete={() => {
          handleDelete(selected);
        }}
        selected={selected}
        handleAddPermissions={handleAddPermissions}
      />
      <CustomizedTable
        isAdmin={isAdmin}
        permissions={permissions}
        selected={selected}
        handleSelectAllClick={handleSelectAllClick}
        handleClick={handleClick}
      />
    </Box>
  );
}
