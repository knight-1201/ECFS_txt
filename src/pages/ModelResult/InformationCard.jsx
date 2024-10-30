import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";

function InformationCard({ cardTitle, dataTitles, modelInfos, isShowDivider }) {
  return (
    <Grid size={12} container direction={"row"} rowSpacing={0}>
      <Grid size={12}>
        {isShowDivider ? <Divider /> : null}
        <Typography variant="h6" textAlign={"left"} fontWeight={800}>
          {cardTitle}
        </Typography>
      </Grid>
      {dataTitles.map((item) => {
        return (
          <Grid
            size={
              item.size > 3
                ? { xs: 12, md: item.size }
                : { xs: 6, md: item.size }
            }
            key={item.dataKey}
            sx={{ display: "flex" }}
          >
            <Typography variant="body1" margin={"0px 8px"}>
              {item.label}
              {item.dataKey === "r2" ||
              item.dataKey === "rmse" ||
              item.dataKey === "mae" ? (
                <small style={{ fontSize: "0.8rem" }}> Test / Training</small>
              ) : null}
              :
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: 1, color: "blue" }}>
              {item.dataKey === "factors" || item.dataKey === "samples"
                ? modelInfos[item.dataKey]?.length
                : item.dataKey === "r2" ||
                  item.dataKey === "rmse" ||
                  item.dataKey === "mae"
                ? modelInfos[item.dataKey]?.test +
                  " / " +
                  modelInfos[item.dataKey]?.training
                : item.type === "percent"
                ? (modelInfos[item.dataKey] * 100).toFixed(1) + "%"
                : modelInfos[item.dataKey]}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default InformationCard;
InformationCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  dataTitles: PropTypes.array.isRequired,
  modelInfos: PropTypes.object.isRequired,
  isShowDivider: PropTypes.bool,
};
