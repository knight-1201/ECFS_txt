import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DeleteUserDialog({ handleDelete, selected }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    handleDelete();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        disabled={selected.length === 0}
        sx={{ px: 2, height: "100%", width: "100%" }}
      >
        Delete
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, width: "300px" }}
          id="customized-dialog-title"
        >
          Delete User Permissions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>User_ID:</Typography>
          {selected.map((item) => {
            return (
              <Typography key={item} gutterBottom>
                {item}
              </Typography>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleDeleteClick}
            startIcon={<DeleteIcon />}
            sx={{ px: 2, height: "100%" }}
          >
            Delete
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
DeleteUserDialog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};
