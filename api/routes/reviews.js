const router = require("express").Router();
const Review = require("../models/Review");
const createError = require("../utils/error");
//CREATE REVIEW
router.post("/", async (req, res, next) => {
  // check if a review already exists
  const review = await Review.findOne({
    publicationId: req.body.publicationId,
    userId: req.body.userId,
  });
  if (review) {
    return next(createError(400, "Vous avez déjà rédigé un avis!"));
  }

  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {
    next(err);
  }
});
//GET REVIEW
router.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.find({ publicationId: req.params.id });
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
});
//GET ALL REVIEWS
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});
//UPDATE REVIEW
router.put("/:id", async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.userId === req.body.userId) {
      const editedReview = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(editedItem);
    } else {
      next(createError(403, "You can update only your review!"));
    }
  } catch (err) {
    next(err);
  }
});
//DELETE REVIEW
router.delete("/:id", async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.userId === req.body.userId) {
      await review.delete();
      res.status(200).json("Review has been deleted!");
    } else {
      res.status(403).json("You can delete only your review!");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
