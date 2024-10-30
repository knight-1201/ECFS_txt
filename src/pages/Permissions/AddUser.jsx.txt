import * as React from "react";
import PropTypes from "prop-types";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ClearIcon from "@mui/icons-material/Clear";
import FormHelperText from "@mui/material/FormHelperText";

const InputField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...props}
      {...field}
      error={meta.touched && meta.error && true}
      helperText={meta.touched && meta.error}
    />
  );
};
const SelectionField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <InputLabel>{props.name}</InputLabel>
      <Select
        {...props}
        {...field}
        size="small"
        sx={{ width: "100%" }}
        error={meta.touched && meta.error && true}
      >
        {props.items.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </>
  );
};
const SwitchField = ({ ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      labelPlacement="start"
      control={<Switch defaultChecked color="primary" {...props} {...field} />}
      label={props.label}
    />
  );
};
const departments = [
  "SMG-ARC5-ENG-1",
  "OP-INT8-IE2",
  "FOC-FSI_M&E-ESI",
  "OP-OPE8AB-IE",
  "OP-OPE12AIE1-IE_C",
  "FOC-FE8S-ESS",
  "FOC-M&E12i-ESS_1",
];
const roles = [
  "System_Admin",
  "OP_Admin",
  "FOC_Admin",
  "OP_8AB",
  "OP_12A",
  "FOC_8S",
  "FOC_12I",
];

export default function AddUserDialog({ handleAddPermissions }) {
  const [open, setOpen] = React.useState(false);
  const validate = yup.object({
    User_ID: yup
      .string()
      .required("Please Input here")
      .matches(/^\d{8}$/, "Please input 8 digits"),
    User_Name: yup
      .string()
      .max(8, "Cannot exceed 8 characters")
      .required("Please Input here"),
    Department: yup.string().required("Please Select a Department"),
    Role: yup.string().required("Please Select a Role"),
    Email: yup.string().email("Invalid email").required("Please Input here"),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<PersonAddAlt1Icon />}
        sx={{ px: 2, height: "100%", width: "100%" }}
      >
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add a New User"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="body2">
                System_Admin can add a new user to the system.
              </Typography>
            </Grid>
            <Formik
              initialValues={{
                User_ID: "",
                User_Name: "",
                Department: "",
                Role: "",
                Email: "",
                Notify: true,
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                handleAddPermissions(values);
                setOpen(false);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <InputField
                      size="small"
                      sx={{ width: "100%" }}
                      type="text"
                      name="User_ID"
                      label="User_ID"
                    />
                  </Grid>
                  <Grid size={6}>
                    <InputField
                      size="small"
                      sx={{ width: "100%" }}
                      type="text"
                      name="User_Name"
                      label="User_Name"
                    />
                  </Grid>
                  <Grid size={6}>
                    <SelectionField name="Department" items={departments} />
                  </Grid>
                  <Grid size={6}>
                    <SelectionField name="Role" items={roles} />
                  </Grid>
                  <Grid size={8}>
                    <InputField
                      size="small"
                      sx={{ width: "100%" }}
                      type="email"
                      name="Email"
                      label="Email"
                    />
                  </Grid>
                  <Grid size={4}>
                    <SwitchField name="Notify" label="Notify" />
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2, mb: 1 }} />
                <DialogActions>
                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<PersonAddAlt1Icon />}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            </Formik>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
AddUserDialog.propTypes = {
  handleAddPermissions: PropTypes.func.isRequired,
};
InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
SelectionField.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
SwitchField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
