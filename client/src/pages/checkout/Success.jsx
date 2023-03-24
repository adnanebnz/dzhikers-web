import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-300 flex items-center justify-center h-screen gap-4">
      <Box
        sx={{
          margin: "5rem ",
          padding: "2rem",
          backgroundColor: "white",
          width: 500,
          height: 500,
        }}
        className="w-1/2 h-1/2 flex flex-col gap-9 items-center justify-center shadow-lg hover:shadow-2xl"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CheckCircleSharpIcon sx={{ fontSize: "52px", color: "green" }} />
          <Typography
            variant="h3"
            sx={{ alignContent: "center", fontWeight: "bold" }}
            className="text-lime-500"
          >
            SUCCESS
          </Typography>
          <Typography variant="h4" fontSize="22px">
            Votre commande est en cours de traitement
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => navigate("/")}>
            Page d'acceuil
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Success;
