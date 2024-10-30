import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import HeatMap from "./HeatMap";

export default function HeatMapCard({ heatMapX, heatMapY, heatMapData }) {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent sx={{ padding: 1 }}>
        <HeatMap
          heatMapX={heatMapX}
          heatMapY={heatMapY}
          heatMapData={heatMapData}
        />
      </CardContent>
    </Card>
  );
}
HeatMapCard.propTypes = {
  heatMapX: PropTypes.array,
  heatMapY: PropTypes.array,
  heatMapData: PropTypes.array,
};
