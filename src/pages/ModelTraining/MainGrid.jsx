import * as React from "react";
import api from "../../utils/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ModelSetting from "./ModelSetting";
import TableWithPage from "./TableWithPage";
import dayjs from "dayjs";
import DescriptionIcon from "@mui/icons-material/Description";

export default function MainGrid() {
  const [tableData, setTableData] = React.useState([]);
  const [tableHeads, setTableHeads] = React.useState([]);

  function handleTableHeads(tableData, icon) {
    const largestObject = tableData.reduce((prev, current) => {
      return Object.keys(current).length > Object.keys(prev).length
        ? current
        : prev;
    });
    const keys = Object.keys(largestObject);
    const newTableHeads = keys.map((key) => ({
      id: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      align: "center",
      minWidth: 100,
      buttonIcon: key === "link" ? icon : "",
    }));
    setTableHeads(newTableHeads);
  }
  async function fetchTableData(reqBody) {
    try {
      const hasEmptyValue = Object.values(reqBody).some(
        (value) => value === ""
      );
      if (hasEmptyValue) {
        alert("請填寫完整資料");
        return;
      }
      const result = await api.getModelTrainingTableData(reqBody);
      result.modelList.forEach((model) => {
        model.updateDate = dayjs(model.updateDate).format("YYYY/MM/DD");
        model.link = `/model/${model.site}_${model.name}`;
      });
      setTableData(result.modelList);
      handleTableHeads(result.modelList, <DescriptionIcon />);
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleTrainingModel(reqBody) {
    try {
      const hasEmptyValue = Object.values(reqBody).some(
        (value) => value === ""
      );
      const hasNonEmptyFactors = reqBody.factors.some(
        (item) => item.factors.length > 0
      );
      if (hasEmptyValue || reqBody.factors.length === 0) {
        alert("請填寫完整資料");
        return;
      }
      if (!hasNonEmptyFactors) {
        alert("請選擇特徵因子");
        return;
      }
      const result = await api.postModelTraining(
        reqBody,
        `${reqBody.Site}_${reqBody.Name}`
      );
      alert(result.message);
      fetchTableData({
        role: JSON.parse(sessionStorage.getItem("user")).role,
      });
    } catch (error) {
      alert(error.message);
    }
  }
  React.useEffect(() => {
    fetchTableData({
      role: JSON.parse(sessionStorage.getItem("user")).role,
    });
  }, []);
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ModelSetting handleTrainingModel={handleTrainingModel} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <TableWithPage tableData={tableData} tableHeads={tableHeads} />
        </Grid>
        <Grid size={12}></Grid>
      </Grid>
    </Box>
  );
}
