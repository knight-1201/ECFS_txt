import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LineChart from "./LineChart";
export default function LineChartCard({ lineChartData }) {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent sx={{ padding: 1 }}>
        <LineChart lineChartData={lineChartData} />
      </CardContent>
    </Card>
  );
}
LineChartCard.propTypes = {
  lineChartData: PropTypes.array,
};
