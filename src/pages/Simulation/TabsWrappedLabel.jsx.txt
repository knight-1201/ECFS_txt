import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const tabsData = [
  {
    value: "BP",
    label: "BP (FOC)",
  },
  {
    value: "FCST",
    label: "FCST (OP)",
  },
  {
    value: "CaseStudy",
    label: "CaseStudy (FOC/COP)",
  },
];

export default function TabsWrappedLabel({
  pageValue,
  handlePageChange,
  permission,
}) {
  return (
    <Tabs
      value={pageValue}
      onChange={handlePageChange}
      aria-label="wrapped label tabs example"
      sx={{ paddingBottom: 0 }}
    >
      {tabsData.map((tab) => {
        return (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            disabled={!permission[tab.value]}
            sx={{
              flexGrow: 1,
              borderBottom: 2,
              borderColor: "divider",
              marginX: 1,
              maxWidth: 1700,
              textTransform: "none",
            }}
          />
        );
      })}
    </Tabs>
  );
}
TabsWrappedLabel.propTypes = {
  pageValue: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  permission: PropTypes.object.isRequired,
};
