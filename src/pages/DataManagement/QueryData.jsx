import * as React from "react";
import PropTypes from "prop-types";
import api from "../../utils/api";
import MenuItem from "@mui/material/MenuItem";
import { Button, Paper, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SendIcon from "@mui/icons-material/Send";
import MonthPicker from "./MonthPicker";
import dayjs from "dayjs";

const SelectionField = ({
  reqBody,
  placeholder,
  renderSelectItems,
  handleChange,
}) => {
  return (
    <Select
      displayEmpty
      onChange={handleChange}
      sx={{ width: "100%" }}
      size="small"
      defaultValue=""
      renderValue={() => {
        if (reqBody.length === 0) {
          return <em>{placeholder}</em>;
        }
        return reqBody;
      }}
    >
      <MenuItem disabled value="">
        <em>{placeholder}</em>
      </MenuItem>
      {renderSelectItems.map((item) => {
        return (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
};
export default function QueryData({ fetchTableData }) {
  const [renderSelect, setRenderSelect] = React.useState({
    sites: [],
    versions: [],
  });
  const [reqBody, setReqBody] = React.useState({
    Role: JSON.parse(sessionStorage.getItem("user")).role,
    Site: "",
    Version: "",
    From: `Y${dayjs().subtract(3, "month").format("YY/MM")}`,
    To: `Y${dayjs().format("YY/MM")}`,
  });

  const handleChange = (event, key) => {
    setReqBody({ ...reqBody, [key]: event.target.value });
  };
  const handelDateFromChange = (date) => {
    setReqBody({ ...reqBody, From: "Y" + date });
  };
  const handelDateToChange = (date) => {
    setReqBody({ ...reqBody, To: "Y" + date });
  };
  async function fetchSelectionData() {
    const result = await api.getDataManageSetting(
      JSON.parse(sessionStorage.getItem("user")).role
    );
    setRenderSelect(result);
  }

  React.useEffect(() => {
    fetchSelectionData();
  }, []);
  return (
    <Paper elevation={2} style={{ padding: "10px 20px" }}>
      <Grid
        container
        rowGap={2}
        columnGap={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid container rowGap={2} size={{ xs: 12, md: 2 }}>
          <Grid size={12}>
            <SelectionField
              reqBody={reqBody.Site}
              placeholder="Site"
              renderSelectItems={renderSelect.sites}
              handleChange={(e) => {
                handleChange(e, "Site");
              }}
            />
          </Grid>
          <Grid size={12}>
            <SelectionField
              reqBody={reqBody.Version}
              placeholder="Version"
              renderSelectItems={renderSelect.versions}
              handleChange={(e) => {
                handleChange(e, "Version");
              }}
            />
          </Grid>
        </Grid>
        <Grid container rowGap={2} size={{ xs: 12, md: 7 }}>
          <Grid size={12}>
            <MonthPicker
              label="From"
              initValue={dayjs().subtract(3, "month")}
              handleChange={handelDateFromChange}
            />
          </Grid>
          <Grid size={12}>
            <MonthPicker
              label="To"
              initValue={dayjs()}
              handleChange={handelDateToChange}
            />
          </Grid>
        </Grid>
        <Grid container rowGap={2} size={{ xs: 12, md: 2 }}>
          <Grid size={12}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              disabled={reqBody.Site === "" || reqBody.Version === ""}
              onClick={() => {
                fetchTableData(reqBody);
              }}
            >
              Query
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
SelectionField.propTypes = {
  reqBody: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  renderSelectItems: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};
QueryData.propTypes = { fetchTableData: PropTypes.func.isRequired };
