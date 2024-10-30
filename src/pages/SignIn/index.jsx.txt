import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "90%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
}));

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({ userID: "", password: "" });
  const [userIDError, setUserIDError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleUserIDChange = (event) => {
    const newFormData = { ...formData, userID: event.target.value };
    setFormData(newFormData);
    setUserIDError(false);
    setErrorMessage("");
  };
  const handlePasswordChange = (event) => {
    const newFormData = { ...formData, password: event.target.value };
    setFormData(newFormData);
    setPasswordError(false);
    setErrorMessage("");
  };
  const validateInputs = (userID, password) => {
    let isValid = true;

    if (!userID) {
      setUserIDError(true);
      setErrorMessage("帳號為必填欄位");
      isValid = false;
    }

    if (!password) {
      setPasswordError(true);
      setErrorMessage("密碼為必填欄位");
      if (!isValid) setErrorMessage("帳號、密碼為必填欄位");
      isValid = false;
    }
    return isValid;
  };
  async function handleLogin() {
    const isValid = validateInputs(formData.userID, formData.password);
    if (!isValid) return;
    await fetch(import.meta.env.VITE_API_BASE_URL + "/User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.userID,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((message) => {
            throw new Error(`${message}`);
          });
        }
      })
      .then((data) => {
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/home";
        return data;
      })
      .catch((error) => {
        setErrorMessage(error.message);
        throw error;
      });
  }
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="UserID" sx={{ lineHeight: "34px" }}>
              帳號
            </FormLabel>
            <TextField
              error={userIDError}
              id="userID"
              type="text"
              name="userID"
              placeholder="請輸入帳號"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={userIDError ? "error" : "primary"}
              sx={{ ariaLabel: "userID" }}
              onChange={handleUserIDChange}
            />
          </FormControl>
          <FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormLabel htmlFor="password">密碼</FormLabel>
              <IconButton
                aria-label="toggle password visibility"
                size="small"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            <TextField
              error={passwordError}
              name="密碼"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <Typography
            component="p"
            color="error"
            textAlign="center"
            sx={{
              mt: 2,
              height: "1.5rem",
              fontWeight: "700",
              visibility: errorMessage ? "visible" : "hidden",
            }}
          >
            {errorMessage}
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleLogin}
          >
            登入
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
