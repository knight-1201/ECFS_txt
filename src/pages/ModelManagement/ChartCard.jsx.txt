import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomChart from "./CustomChart";
export default function ChartCard({ compareData }) {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent sx={{ padding: 1 }}>
        <CustomChart compareData={compareData} />
      </CardContent>
    </Card>
  );
}
ChartCard.propTypes = {
  compareData: PropTypes.object.isRequired,
};
