import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const { id } = useParams();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [error, setError] = useState(undefined);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:8800/api/users/${id}`,
        {
          lastName: event.target.lastName.value,
          firstName: event.target.firstName.value,
          age: event.target.age.value,
          email: event.target.email.value,
          password: event.target.password.value,
        },

        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="text-gray-800 text-xl font-semibold mb-8">
          MODIFIER VOTRE PROFILE
        </h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom="10px"
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
                <EditIcon className="mr-1" /> Modifier la photo de profile
              </Fab>
            </label>
          </Box>
          <Box display="flex" gap="10px">
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Nom"
              name="lastName"
              autoComplete="lasttName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Prenom"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
          </Box>

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
          <FormControl variant="outlined" fullWidth sx={{ marginTop: "10px" }}>
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
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
              marginBottom: 2,
            }}
          >
            Modifier votre profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
