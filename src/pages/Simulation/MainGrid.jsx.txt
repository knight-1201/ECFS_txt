import * as React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import TabsWrappedLabel from "./TabsWrappedLabel";
import VersionSelect from "./VersionSelect";
import TableWithPage from "./TableWithPage";
import CustomizedTable from "./CustomizedTable";
import { Paper, Typography } from "@mui/material";
const mockPermission = {
  system: { BP: true, FCST: true, CaseStudy: true },
  op: { BP: false, FCST: true, CaseStudy: false },
  foc: { BP: true, FCST: false, CaseStudy: true },
  default: { BP: false, FCST: false, CaseStudy: false },
};
const getUserPermission = (role) => {
  switch (role) {
    case "System_Admin":
      return mockPermission.system;
    case "OP_Admin":
    case "OP_12A":
      return mockPermission.op;
    case "FOC_Admin":
    case "FOC_8S":
    case "FOC12I":
      return mockPermission.foc;
    default:
      return mockPermission.default;
  }
};
const mockHead = [
  "type",
  "C",
  "D",
  "E",
  "F",
  "I",
  "X",
  "A",
  "CD",
  "B",
  "G",
  "H",
  "J",
  "K",
];
const mockData = [
  {
    type: "actual data",
    C: "Done",
    D: "Done",
    E: "Done",
    F: "Done",
    I: "Not Ready",
    X: "Done",
    A: "Done",
    CD: "Done",
    B: "Done",
    G: "Done",
    H: "Done",
    J: "Done",
    K: "Done",
  },
  {
    type: "fcst data",
    C: "Done",
    D: "Done",
    E: "Done",
    F: "Done",
    I: "Done",
    X: "Done",
    A: "Done",
    CD: "Done",
    B: "Done",
    G: "Done",
    H: "Done",
    J: "Done",
    K: "Done",
  },
];
const mockVersion = {
  BP: [
    { version: "2025BP0811", from: "Y25/1", to: "Y25/12" },
    { version: "2025BP0708", from: "Y25/1", to: "Y25/12" },
    { version: "2024BP1111", from: "Y24/1", to: "Y24/12" },
    { version: "2024BP0708", from: "Y24/1", to: "Y24/12" },
    { version: "2025BP0711", from: "Y25/1", to: "Y25/12" },
    { version: "2025BP0608", from: "Y25/1", to: "Y25/12" },
    { version: "2024BP1011", from: "Y24/1", to: "Y24/12" },
    { version: "2024BP0608", from: "Y24/1", to: "Y24/12" },
  ],
  FCST: [
    { version: "2025FCST0811", from: "Y25/1", to: "Y25/12" },
    { version: "2025FCST0708", from: "Y25/1", to: "Y25/12" },
    { version: "2024FCST1111", from: "Y24/1", to: "Y24/12" },
    { version: "2024FCST0708", from: "Y24/1", to: "Y24/12" },
  ],
  CaseStudy: [
    { version: "2025CaseStudy0811", from: "Y25/1", to: "Y25/12" },
    { version: "2025CaseStudy0708", from: "Y25/1", to: "Y25/12" },
    { version: "2024CaseStudy1111", from: "Y24/1", to: "Y24/12" },
    { version: "2024CaseStudy0708", from: "Y24/1", to: "Y24/12" },
  ],
};

export default function MainGrid() {
  const reqBodyInit = {
    Role: JSON.parse(sessionStorage.getItem("user")).role,
    Version: "",
    From: `Y${dayjs().subtract(3, "month").format("YY/MM")}`,
    To: `Y${dayjs().format("YY/MM")}`,
  };
  const permission = getUserPermission(
    JSON.parse(sessionStorage.getItem("user")).role
  );
  const [pageValue, setPageValue] = React.useState("BP");
  const [reqBody, setReqBody] = React.useState(reqBodyInit);
  const [renderSelect, setRenderSelect] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [tableHeads, setTableHeads] = React.useState([]);
  const [versionTableData, setVersionTableData] = React.useState([]);

  const handlePageChange = (event, newValue) => {
    setPageValue(newValue);
    // setRenderSelect(mockVersion[newValue].map((item) => item.version));
    // setVersionTableData(mockVersion[newValue]);
    // setTableData([]);
    // setTableHeads([]);
  };
  const handelDateFromChange = (date) => {
    setReqBody({ ...reqBody, From: "Y" + date });
  };
  const handelDateToChange = (date) => {
    setReqBody({ ...reqBody, To: "Y" + date });
  };
  const handleChange = (event, key) => {
    setReqBody({ ...reqBody, [key]: event.target.value });
  };
  const handleQuery = (reqBody) => {
    setTableData(mockData);
  };
  React.useEffect(() => {
    const firstPage = Object.entries(permission).find(
      ([key, value]) => value
    )?.[0];
    if (!firstPage) {
      setPageValue("");
      alert("You Don't have permission for this page");
      return;
    }
    setPageValue(firstPage);
    setTableHeads(mockHead);
    setVersionTableData(mockVersion[firstPage]);
    setRenderSelect(mockVersion[firstPage].map((item) => item.version));
  }, []);
  React.useEffect(() => {
    setTableHeads(mockHead);
    setTableData([]);
    setRenderSelect(mockVersion[pageValue].map((item) => item.version));
    setVersionTableData(mockVersion[pageValue]);
    setReqBody(reqBodyInit);
  }, [pageValue]);
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
      <TabsWrappedLabel
        pageValue={pageValue}
        handlePageChange={handlePageChange}
        permission={permission}
      />
      <div>
        <Typography
          variant="h6"
          fontWeight={800}
          textAlign={"left"}
          paddingBottom={1}
        >
          儲存版本資訊
        </Typography>
        <TableWithPage rows={versionTableData} />
      </div>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 2,
          border: "1px solid lightgray",
          textAlign: "left",
        }}
      >
        <Typography variant="h6" fontWeight={800} textAlign={"left"}>
          設定檢視範圍
        </Typography>
        <VersionSelect
          renderSelect={renderSelect}
          reqBody={reqBody}
          handelDateFromChange={handelDateFromChange}
          handelDateToChange={handelDateToChange}
          handleChange={handleChange}
          handleQuery={handleQuery}
        />
        <Typography variant="h6" fontWeight={800}>
          檢視數據集資料狀態
        </Typography>
        <CustomizedTable tableData={tableData} tableHeads={tableHeads} />
      </Paper>
    </Box>
  );
}
