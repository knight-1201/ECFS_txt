import * as React from "react";
import api from "../../utils/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import FileUpload from "./FileUpload";
import QueryData from "./QueryData";
import CustomizedTable from "./CustomizedTable";

export default function MainGrid() {
  const [tableData, setTableData] = React.useState([]);
  const [tableHeads, setTableHeads] = React.useState([
    "site",
    "YM",
    "TTL用電",
    "1. PPQTY",
    "2. WO nomalize",
    "3. TSD% (Tool Shutdown)",
    "4. WSD% (Tool Warm Shutdown)",
    "5. CSD% (Tool Cold Shutdown)",
    "6. Top1高用電機台move (MI)",
    "7. Top2高用電機台move (METE)",
    "8. Top3高用電機台move (CAROZ)",
    "9. Install 生產機台數 ",
    "10. install 冰機台數",
    "11. 電熱鍋爐運轉時數",
    "12. 無塵室運作面積",
    "13. 全廠停電時數 (APM)",
    "14. 全廠Idle 時數 (APM)",
    "15. 外氣焓值",
    "16. 限水天數 (影響冰機運作效率)",
    "17. Workday (扣除停工天數)",
    "18. 假日天數 (影響辦公區用電)",
  ]);
  function handleTableHeads(tableData) {
    const largestObject = tableData.reduce((prev, current) => {
      return Object.keys(current).length > Object.keys(prev).length
        ? current
        : prev;
    });
    const keysArray = Object.keys(largestObject);
    setTableHeads(keysArray);
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
      const result = await api.getDataManageTableData(reqBody);
      setTableData(JSON.parse(result.xlsData));
      handleTableHeads(JSON.parse(result.xlsData));
    } catch (error) {
      alert(error.message);
    }
  }
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
        <Grid size={{ xs: 12, md: 4 }}>
          <FileUpload />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <QueryData fetchTableData={fetchTableData} />
        </Grid>
        <Grid size={12}>
          <CustomizedTable tableData={tableData} tableHeads={tableHeads} />
        </Grid>
      </Grid>
    </Box>
  );
}
