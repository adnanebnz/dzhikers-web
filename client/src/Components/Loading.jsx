import { CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen max-w-5xl">
      <CircularProgress />
    </div>
  );
};

export default Loading;
