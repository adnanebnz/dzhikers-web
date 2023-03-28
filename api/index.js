const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const itemRoute = require("./routes/items");
const orderRoute = require("./routes/orders");
const resetPasswordRoute = require("./routes/reset");
const messagesRoute = require("./routes/messages");
const reviewsRoute = require("./routes/reviews");
const reservationsRoute = require("./routes/reservations");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to MongoDB!"));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
let server = http.createServer(app);
let io = socketIO(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

app.use(express.static("Images"));
app.use("/images", express.static("Images"));

//ROUTES

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/reservations", reservationsRoute);
app.use("/api/reset", resetPasswordRoute);
app.use("/api/items", itemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messagesRoute);

//ERROR HANDLING
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//SERVER STARTUP

server.listen(8800, () => {
  console.log("Server listening at port 8800 🚀");
});
