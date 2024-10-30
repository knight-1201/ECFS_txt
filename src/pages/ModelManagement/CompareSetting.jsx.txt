import * as React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

function ModelSetting({ selected, canHandleCompareModel, handleCompareModel }) {
  return (
    <Button
      variant="contained"
      size="medium"
      disabled={!canHandleCompareModel}
      onClick={handleCompareModel}
      sx={{ padding: "5px 10px", width: "50%", marginY: "10px" }}
    >
      {canHandleCompareModel ? "執行版本比較" : "請選擇兩個版本"}
    </Button>
  );
}

export default ModelSetting;
ModelSetting.propTypes = {
  selected: PropTypes.array.isRequired,
  canHandleCompareModel: PropTypes.bool.isRequired,
  handleCompareModel: PropTypes.func.isRequired,
};
