import { Box, CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        overflow: "hidden",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
