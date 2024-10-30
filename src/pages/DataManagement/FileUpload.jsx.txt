import { useState } from "react";
import { styled } from "@mui/material/styles";
import api from "../../utils/api";
import { Button, Paper, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Grid from "@mui/material/Grid2";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
function Test() {
  const [fileList, setFileList] = useState(null);
  const [filesName, setFilesName] = useState(null);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setFileList(e.target.files);
        setFilesName(Array.from(e.target.files).map((file) => file.name));
      } else {
        alert("Please select only excel file types");
      }
    }
  };

  // submit event
  const handleFileSubmit = async (fileList) => {
    if (fileList) {
      const formData = new FormData();
      const files = fileList ? [...fileList] : [];
      files.forEach((file) => {
        formData.append(`files`, file, file.name);
      });
      try {
        const result = await api.postXlsx(formData);
        alert(result.uploadMessage);
        setFileList(null);
        setFilesName(null);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <Paper elevation={2} style={{ padding: "10px 20px" }}>
      <form>
        <Grid container gap={2} sx={{ justifyContent: "space-between" }}>
          <Grid size={12}>
            <Stack
              direction="row"
              gap={1}
              sx={{
                justifyContent: "flex-start",
                alignItems: "center",
                height: "40px",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<AttachFileIcon />}
                sx={{
                  width: "40%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Add
                <VisuallyHiddenInput
                  type="file"
                  required
                  onChange={handleFile}
                  multiple
                />
              </Button>
              <Typography
                variant="span"
                sx={{
                  textAlign: "left",
                  width: "60%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {filesName
                  ? filesName.map((file) => file).join(", ")
                  : "請選擇XLSX檔案"}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Button
              sx={{ width: "100%", height: "40px" }}
              component="label"
              role={undefined}
              variant="contained"
              disabled={fileList ? false : true}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                handleFileSubmit(fileList);
              }}
            >
              Upload files
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default Test;
