const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hikeId: {
    type: String,
    required: true,
  },
  hikeTitle: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  places: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Reservation", reservationSchema);
