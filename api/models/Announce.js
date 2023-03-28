const mongoose = require("mongoose");

const AnnounceSchema = new mongoose.Schema({
  hikeId: {
    type: String,
    required: true,
  },
  organizerId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Announce", AnnounceSchema);
