import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { Button, Typography } from "@mui/material";
import SelectionField from "../../components/SelectionField";
import MonthPicker from "../../components/MonthPicker";
import SendIcon from "@mui/icons-material/Send";

const canQuery = (reqBody) => {
  const hasVersion = reqBody.Version !== "";
  const regex = /^Y\d{2}\/\d{2}$/;
  const isDateFromValid = regex.test(reqBody.From);
  const isDateToValid = regex.test(reqBody.To);
  return hasVersion && isDateFromValid && isDateToValid;
};

function VersionSelect({
  renderSelect,
  reqBody,
  handelDateFromChange,
  handelDateToChange,
  handleChange,
  handleQuery,
}) {
  return (
    <>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        spacing={1}
        marginBottom={1}
        justifyContent={"space-between"}
      >
        <Grid
          container
          size={{ xs: 12, md: 10 }}
          direction={{ xs: "column", md: "row" }}
        >
          <Grid size={{ xs: 12, md: 4 }} spacing={0} container>
            <Typography variant="p" textAlign="left" fontSize={"14px"}>
              RF Version
            </Typography>
            <SelectionField
              reqBody={reqBody.Version}
              placeholder="Version"
              renderSelectItems={renderSelect}
              handleChange={(e) => {
                handleChange(e, "Version");
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} spacing={0} container>
            <Typography variant="p" textAlign="left">
              From
            </Typography>
            <MonthPicker
              label=""
              initValue={dayjs().subtract(3, "month")}
              handleChange={handelDateFromChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} spacing={0} container>
            <Typography variant="p" textAlign="left">
              TO
            </Typography>
            <MonthPicker
              label=""
              initValue={dayjs()}
              handleChange={handelDateToChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          disabled={!canQuery(reqBody)}
          sx={{ height: "40px", alignSelf: "flex-end" }}
          onClick={() => {
            handleQuery(reqBody);
          }}
        >
          Query
        </Button>
      </Grid>
    </>
  );
}

export default VersionSelect;
VersionSelect.propTypes = {
  renderSelect: PropTypes.array.isRequired,
  reqBody: PropTypes.object.isRequired,
  handelDateFromChange: PropTypes.func.isRequired,
  handelDateToChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleQuery: PropTypes.func.isRequired,
};
