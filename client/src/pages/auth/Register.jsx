import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import {
  AddCircleOutline,
  AddIcCallOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a
        onClick={() => {
          navigate("/");
        }}
      >
        DZHIKERS
      </a>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [error, setError] = useState(undefined);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
      email: data.get("email"),
      image: selectedFile,
      age: data.get("age"),
      password: data.get("password"),
    };
    try {
      await axios.post(
        "https://dzhikers.onrender.com/api/users/register",
        values,
        { headers: { "Content-Type": "multipart/form-data" } },
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Créer un compte
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box display="flex" gap="10px">
              <TextField
                margin="normal"
                required
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="lasttName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                id="firstName"
                label="Prenom"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />
            </Box>
            <Box display="flex" gap="10px">
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nom d'utulisateur"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                id="age"
                label="Votre age"
                name="age"
                autoComplete="age"
                autoFocus
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginTop="5px"
            >
              <label htmlFor="image">
                <input
                  style={{ display: "none" }}
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleFileSelect}
                />

                <Fab
                  color="primary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AddIcon /> Ajouter une photo de profil
                </Fab>
              </label>
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl
              variant="outlined"
              fullWidth
              sx={{ marginTop: "10px" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Mot de passe
              </InputLabel>
              <OutlinedInput
                fullWidth
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mot de passe"
              />
            </FormControl>
            {error && (
              <Typography sx={{ color: "red" }} textAlign="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Créer votre compte
            </Button>
            <Grid container>
              <Grid item>
                <a
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {"Vous avez déja un compte? Connectez-vous"}
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
