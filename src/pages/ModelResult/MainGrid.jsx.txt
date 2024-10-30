import * as React from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Card } from "@mui/material";
import HeatMapCard from "./HeatMapCard";
import LineChartCard from "./LineChartCard";
import InformationCard from "./InformationCard";

const modelTitles = [
  { dataKey: "site", label: "Site", size: 3, type: "string" },
  { dataKey: "name", label: "Name", size: 3, type: "string" },
  { dataKey: "version", label: "Version", size: 3, type: "string" },
  { dataKey: "updateDate", label: "Update Date", size: 3, type: "string" },
];
const trainTitles = [
  { dataKey: "factors", label: "Factors", size: 3, type: "number" },
  { dataKey: "samples", label: "Samples", size: 3, type: "number" },
  { dataKey: "samplePeriod", label: "Sample Period", size: 6, type: "string" },
  {
    dataKey: "trainDataSet",
    label: "Training data set",
    size: 6,
    type: "percent",
  },
  {
    dataKey: "trainAlgorithm",
    label: "Training Algorithm",
    size: 6,
    type: "string",
  },
];
const evaluationTitles = [
  { dataKey: "r2", label: "R2", size: 3, type: "number" },
  { dataKey: "rmse", label: "RMSE", size: 3, type: "number" },
  { dataKey: "mae", label: "MAE", size: 3, type: "number" },
  {
    dataKey: "compareCurrent",
    label: "vs. current model",
    size: 6,
    type: "percent",
  },
  { dataKey: "compareActual", label: "vs. actual", size: 6, type: "percent" },
];
function handleSamplePeriod(samples) {
  //排序
  const sortedSamples = samples.sort((a, b) => {
    const [aYear, aMonth] = a.split("/").map(Number);
    const [bYear, bMonth] = b.split("/").map(Number);
    if (aYear === bYear) {
      return aMonth - bMonth; // 同一年比較月份
    }
    return aYear - bYear; // 不同年比較年份
  });
  // 找出最小值和最大值
  const minSample = sortedSamples[0]; // 最小值
  const maxSample = sortedSamples[sortedSamples.length - 1]; // 最大值

  // 將月份格式化為兩位數
  const formatMonth = (sample) => {
    const [year, month] = sample.split("/");
    return `${year}/${month.padStart(2, "0")}`;
  };
  const period = `${formatMonth(minSample)}~${formatMonth(maxSample)}`;
  return period;
}
export default function MainGrid() {
  const [modelInfo, setModelInfo] = React.useState({});
  const [trainInfo, setTrainInfo] = React.useState({});
  const [evaluationInfo, setEvaluationInfo] = React.useState({});
  const [heatMapData, setHeatMapData] = React.useState([]);
  const [lineChartData, setLineChartData] = React.useState([]);
  const { id } = useParams();

  async function fetchModelResult() {
    try {
      const result = await api.getModelResult(id);
      result.modelInfo.updateDate = dayjs(result.modelInfo.updateDate).format(
        "YYYY/MM/DD"
      );
      result.trainInfo.samplePeriod = handleSamplePeriod(
        result.trainInfo.samples
      );
      setModelInfo(result.modelInfo);
      setTrainInfo(result.trainInfo);
      setEvaluationInfo(result.evaluation);
      setHeatMapData(result.heatMapData);
      setLineChartData(result.powerUsages);
    } catch (error) {
      alert(error.message);
    }
  }
  React.useEffect(() => {
    fetchModelResult();
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
      <Card variant="outlined" sx={{ width: "100%", paddingX: 2, paddingY: 1 }}>
        <Grid container rowSpacing={1} justifyContent={"flex-start"}>
          <InformationCard
            cardTitle={"模型資訊"}
            dataTitles={modelTitles}
            modelInfos={modelInfo}
            isShowDivider={false}
          />
          <InformationCard
            cardTitle={"訓練資訊"}
            dataTitles={trainTitles}
            modelInfos={trainInfo}
            isShowDivider={true}
          />
          <InformationCard
            cardTitle={"模型評估資訊"}
            dataTitles={evaluationTitles}
            modelInfos={evaluationInfo}
            isShowDivider={true}
          />
        </Grid>
      </Card>
      <Grid container spacing={1} direction={"row"}>
        <Grid size={{ xs: 12, md: 6 }}>
          <HeatMapCard
            heatMapX={trainInfo.factors}
            heatMapY={trainInfo.factors}
            heatMapData={heatMapData}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LineChartCard lineChartData={lineChartData} />
        </Grid>
      </Grid>
    </Box>
  );
}
