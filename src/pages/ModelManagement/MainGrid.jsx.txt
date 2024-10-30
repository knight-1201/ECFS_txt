import * as React from "react";
import api from "../../utils/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CustomizedTable from "./CustomizedTable";
import CompareSetting from "./CompareSetting";
import { useSearchParams, useNavigate } from "react-router-dom";
import ChartCard from "./ChartCard";

export default function MainGrid() {
  const [selected, setSelected] = React.useState([]);
  const [compareData, setCompareData] = React.useState({});
  const [canHandleCompareModel, setCanHandleCompareModel] =
    React.useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modelList = searchParams.get("modelList");
  const handleSelectAllClick = () => {
    setSelected([]);
    setCanHandleCompareModel(false);
  };
  async function fetchCompareData(modelList) {
    try {
      const modelListID = modelList.join(",");
      const result = await api.getModelMCompareData(modelListID);
      const modelData = JSON.parse(result.modelsData);
      const newResult = { ...result, modelsData: modelData };
      setCompareData(newResult);
    } catch (error) {
      alert(error.message);
    }
  }
  const handleCompareModel = () => {
    if (selected.length !== 2) {
      alert("請選擇兩個模型進行比較");
      return;
    }
    // navigate(`/model-management/?modelList=${selected.join(",")}`);
    fetchCompareData(selected);
    setCanHandleCompareModel(false);
  };
  const handleClick = (event, id) => {
    const isSelectedItem = selected.includes(id);
    const isSelectOver = selected.length >= 2;
    if (isSelectedItem) {
      const newSelected = selected.filter((item) => item !== id);
      setSelected(newSelected);
      setCanHandleCompareModel(newSelected.length === 2);
    } else if (!isSelectOver) {
      setSelected([...selected, id]);
      setCanHandleCompareModel([...selected, id].length === 2);
    } else {
      const newSelected = [...selected, id];
      newSelected.shift();
      setSelected(newSelected);
      setCanHandleCompareModel(newSelected.length === 2);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: "1700px" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Grid container spacing={1}>
        <Grid size={12}>
          <CustomizedTable
            selected={selected}
            handleSelectAllClick={handleSelectAllClick}
            handleClick={handleClick}
          />
        </Grid>
        <Grid size={12}>
          <CompareSetting
            selected={selected}
            canHandleCompareModel={canHandleCompareModel}
            handleCompareModel={handleCompareModel}
          />
        </Grid>
        <Grid size={12}>
          <ChartCard compareData={compareData} />
        </Grid>
      </Grid>
    </Box>
  );
}
