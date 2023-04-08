const express = require("express");
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
const announcesRoute = require("./routes/announces");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to MongoDB!"));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://dzhikers.live", credentials: true }));

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
app.use("/api/announces", announcesRoute);

//ERROR HANDLING
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Une erreur est occuré!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//SERVER STARTUP

app.listen(8800, () => {
  console.log("Server listening at port 8800 🚀");
});
