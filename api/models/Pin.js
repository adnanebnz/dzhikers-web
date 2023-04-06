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

    //TODO: WEATHER AND DATE how many people will come familial or friends organizer also organizer profile and skills how many males and females in a single hiking stuff to bring for the hike like foods and utilities PLACE TO MEET TO START THE HIKE
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
