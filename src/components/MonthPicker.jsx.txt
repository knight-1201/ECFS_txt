import * as React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";

const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputBase-input": {
    padding: "8.5px 14px",
  },
});
export default function MonthPicker({ label, initValue, handleChange }) {
  const [value, setValue] = React.useState(dayjs(initValue));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          handleChange(newValue.format("YY/MM"));
        }}
        views={["year", "month"]}
        sx={{ width: "100%" }}
      />
    </LocalizationProvider>
  );
}
MonthPicker.propTypes = {
  label: PropTypes.string.isRequired,
  initValue: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
