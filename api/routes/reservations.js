const router = require("express").Router();
const Reservation = require("../models/Reservation");
const Pin = require("../models/Pin");
const User = require("../models/User");
async function updatePlaces(_id) {
  const pin = await Pin.findById(_id);
  pin.places -= 1;

  await pin.save();
}
async function increasePlaces(_id) {
  const pin = await Pin.findById(_id);
  pin.places += 1;

  await pin.save();
}
router.post("/:id/register", async (req, res, next) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (pin.places === 0) {
      res
        .status(400)
        .json({ message: "Il ne reste pas de place pour cette randonnéee!" });
    }
    const reservation = await Reservation.create(req.body);
    await updatePlaces(reservation.hikeId);
    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
});

//delete reservation
router.delete("/:id", async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    await increasePlaces(reservation.hikeId);
    await reservation.remove();
    res.status(200).json({ message: "Reservation deleted" });
  } catch (err) {
    next(err);
  }
});

//get all reservations
router.get("/", async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
});

//get one reservation
router.get("/:id", async (req, res, next) => {
  try {
    const reservation = await Reservation.find({ userId: req.params.id });
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
});

//delete a single reservation
router.delete("/:id", async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    await increasePlaces(reservation.hikeId);
    await reservation.remove();
    res.status(200).json({ message: "Reservation deleted" });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/details", async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ hikeId: req.params.id });
    //get all participants
    const participants = await User.find({
      _id: { $in: reservations.map((r) => r.userId) },
    });

    res.status(200).json({ reservations, participants });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
