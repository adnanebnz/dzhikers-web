import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useParams();
  useEffect(() => {
    const fetchPage = async () => {
      try {
        await axios.get(
          `https://dzhikers-web-production.up.railway.app/api/reset/reset-password/${id}/${token}`
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPage();
  }, []);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
    } else {
      try {
        await axios.post(
          `https://dzhikers-web-production.up.railway.app/api/reset/reset-password/${id}/${token}`,
          { password: password },
          { withCredentials: true }
        );
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Changer votre mot de passe
        </Typography>
        <Box
          component="form"
          onSubmit={handleChangePassword}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormControl variant="outlined" fullWidth sx={{ marginTop: "15px" }}>
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
          <FormControl variant="outlined" fullWidth sx={{ marginTop: "15px" }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Confirmer le mot de passe
            </InputLabel>
            <OutlinedInput
              fullWidth
              name="confirmPassword"
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
              label="Confirmer le mot de passe"
            />
          </FormControl>

          <Box>
            {error && (
              <Typography textAlign="center" sx={{ color: "red" }}>
                {error}
              </Typography>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Changer le mot de passe
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
