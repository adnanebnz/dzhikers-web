const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userPfp: {
      type: String,
      required: true,
    },
    publicationId: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: [true, "Svp entrez un texte"],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Svp entrez une évaluation enrre 1 et 5"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
