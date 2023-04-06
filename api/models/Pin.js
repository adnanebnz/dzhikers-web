const mongoose = require("mongoose");
const PinSchema = new mongoose.Schema(
  {
    organizer: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
    },
    desc: {
      type: String,
      required: true,
      min: 3,
    },
    date: {
      type: Date,
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
    level: {
      type: String,
      required: true,
    },
    places: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    numberOfRatings: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
