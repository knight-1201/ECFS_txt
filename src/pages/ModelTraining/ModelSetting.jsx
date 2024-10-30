import * as React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import api from "../../utils/api";
import SelectionField from "../../components/SelectionField";
import MonthPicker from "../../components/MonthPicker";
import { Button, Paper, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function ModelSetting({ handleTrainingModel }) {
  const [renderSelect, setRenderSelect] = React.useState({
    sites: [],
    factors: [],
  });
  const [reqBody, setReqBody] = React.useState({
    Role: JSON.parse(sessionStorage.getItem("user")).role,
    Name: "",
    Site: "",
    factors: [],
    From: `Y${dayjs().subtract(3, "month").format("YY/MM")}`,
    To: `Y${dayjs().format("YY/MM")}`,
  });
  const factorClassRef = React.useRef("");
  const FactorsCheckBox = React.forwardRef(function FactorsCheckBox(
    props,
    ref
  ) {
    const targetFactorClass = ref.current;
    if (targetFactorClass === "") return null;
    const factors = renderSelect.factors.find(
      (item) => item.factorClass === targetFactorClass
    );
    return (
      <Grid container size={12}>
        <Grid size={12}>
          <strong>請勾選特徵強制選擇</strong>
        </Grid>
        {factors.factors.map((factor) => (
          <Grid key={factor} size={6}>
            <Tooltip title={factor} arrow>
              <FormControlLabel
                sx={{
                  width: "100%",
                  "& .MuiFormControlLabel-label": {
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontSize: "12px",
                  },
                }}
                value={factor}
                control={
                  <Checkbox
                    size="small"
                    checked={isSelected(targetFactorClass, factor)}
                    onChange={(e) => {
                      handleCheckboxChange(e, targetFactorClass);
                    }}
                  />
                }
                label={factor}
                labelPlacement="end"
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    );
  });

  // onchange event
  const handleChange = (event, key) => {
    setReqBody({ ...reqBody, [key]: event.target.value });
  };
  const handleFactorChange = (event) => {
    const newFactors = [...reqBody.factors];
    const found = newFactors.find(
      (item) => item.factorClass === event.target.value
    );
    if (!found) {
      newFactors.unshift({ factorClass: event.target.value, factors: [] });
    }
    const newReqBody = { ...reqBody, factors: newFactors };
    factorClassRef.current = event.target.value;
    setReqBody(newReqBody);
  };
  const handelDateFromChange = (date) => {
    setReqBody({ ...reqBody, From: "Y" + date });
  };
  const handelDateToChange = (date) => {
    setReqBody({ ...reqBody, To: "Y" + date });
  };
  const handleCheckboxChange = (event, ref) => {
    const newFactors = [...reqBody.factors];
    const targetFactorClass = ref;
    const foundIndex = newFactors.findIndex(
      (factor) => factor.factorClass === targetFactorClass
    );
    if (event.target.checked) {
      newFactors[foundIndex].factors.push(event.target.value);
    } else {
      newFactors[foundIndex].factors = newFactors[foundIndex].factors.filter(
        (factor) => factor !== event.target.value
      );
    }
    setReqBody({ ...reqBody, factors: newFactors });
  };
  const isSelected = (ref, value) => {
    const targetFactors = reqBody.factors.find(
      (item) => item.factorClass === ref
    ).factors;
    const isSelected = targetFactors.includes(value);
    return isSelected;
  };
  // submit event
  async function fetchSelectionData() {
    const result = await api.getModelSetting(
      JSON.parse(sessionStorage.getItem("user")).role
    );
    result.factors.map((factor) => factor.factorClass);
    setRenderSelect(result);
  }
  React.useEffect(() => {
    fetchSelectionData();
  }, []);
  return (
    <>
      <Paper elevation={2} style={{ padding: "10px 20px", height: "100%" }}>
        <Grid
          container
          direction={"column"}
          justifyContent={"space-between"}
          sx={{ height: "100%" }}
        >
          <Grid size={12} sx={{ paddingBottom: "8px" }}>
            <Typography variant="h5">Model Setting</Typography>
          </Grid>
          <Grid
            size={12}
            container
            gap={2}
            flexGrow={1}
            sx={{
              paddingTop: "8px",
              borderTop: "2px solid lightgray",
              alignContent: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Grid size={12}>
              <TextField
                label="Model Name"
                sx={{ width: "100%" }}
                onChange={(e) => handleChange(e, "Name")}
              />
            </Grid>
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
            <Grid size={12}>
              <SelectionField
                reqBody={
                  reqBody.factors.length === 0
                    ? ""
                    : reqBody.factors[0].factorClass
                }
                placeholder="Factor Class"
                renderSelectItems={renderSelect.factors.map(
                  (factor) => factor.factorClass
                )}
                handleChange={(e) => {
                  handleFactorChange(e);
                }}
                ref={factorClassRef}
              />
            </Grid>
            <FactorsCheckBox ref={factorClassRef} />
          </Grid>
          <Grid
            size={12}
            container
            columnSpacing={2}
            justifyContent={"flex-end"}
            sx={{ borderTop: "2px solid lightgray", paddingTop: "8px" }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                handleTrainingModel(reqBody);
              }}
            >
              訓練模型
            </Button>
            <Button variant="contained" size="medium">
              版本儲存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default ModelSetting;
ModelSetting.propTypes = {
  handleTrainingModel: PropTypes.func.isRequired,
};
