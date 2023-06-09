const router = require("express").Router();
const Pin = require("../models/Pin");
const multer = require("multer");
const path = require("path");
const Announce = require("../models/Announce");
const Reservation = require("../models/Reservation");

//MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

//create a pin
router.post("/", upload.single("image"), async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const newPin = new Pin({
    organizer: req.body.organizer,
    title: req.body.title,
    desc: req.body.desc,
    date: req.body.date,
    lat: req.body.lat,
    long: req.body.long,
    level: req.body.level,
    places: req.body.places,
    duration: req.body.duration,
    price: req.body.price,
    img: url + "/Images/" + req.file.filename,
  });
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    next(err);
  }
});

//GET ALL PINS WITHOUT FILTER
router.get("/pure", async (req, res, next) => {
  try {
    const count = await Pin.countDocuments({});
    const pins = await Pin.find();
    res.status(200).json({ pins, count });
  } catch (err) {
    next(err);
  }
});
//get all pins for organizer
router.get("/organizer/:username", async (req, res, next) => {
  try {
    const hikes = await Pin.find({ organizer: req.params.username });

    res.status(200).json(hikes);
  } catch (err) {
    next(err);
  }
});

//get pins filtering

router.get("/", async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 16;
  try {
    const level = req.query.level;
    if (level !== "all") {
      const count = await Pin.countDocuments({});
      const pins = await Pin.find({
        level: level,
        price: { $gte: req.query.min, $lte: req.query.max },
      })
        .skip((page - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
      res.status(200).json({ pins, count });
    } else if (level === "all") {
      const count = await Pin.countDocuments({});

      const pins = await Pin.find({
        price: { $gte: req.query.min, $lte: req.query.max },
      })
        .skip((page - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
      res.status(200).json({ pins, count });
    }
  } catch (err) {
    next(err);
  }
});
// GET A SINGLE PIN
router.get("/:id", async (req, res, next) => {
  try {
    const pin = await Pin.findById(req.params.id);
    res.status(200).json(pin);
  } catch (err) {
    next(err);
  }
});

//DELETE A PIN
router.delete("/:id", async (req, res, next) => {
  try {
    await Pin.findByIdAndDelete(req.params.id);
    await Announce.deleteMany({ hikeId: req.params.id });
    await Reservation.deleteMany({ hikeId: req.params.id });
    res.status(200).json("pin deleted");
  } catch (err) {
    next(err);
  }
});
//UPDATE A PIN
router.put("/:id", async (req, res, next) => {
  try {
    const pin = await Pin.findById(req.params.id);
    pin.organizer = req.body.organizer || pin.organizer;
    pin.title = req.body.title || pin.title;
    pin.desc = req.body.desc || pin.desc;
    pin.date = req.body.date || pin.date;
    pin.lat = req.body.lat || pin.lat;
    pin.long = req.body.long || pin.long;
    pin.level = req.body.level || pin.level;
    pin.places = req.body.places || pin.places;
    pin.duration = req.body.duration || pin.duration;
    pin.price = req.body.price || pin.price;
    pin.organizer = req.body.organizer || pin.organizer;
    pin.lat = req.body.lat || pin.lat;
    pin.long = req.body.long || pin.long;
    await Pin.findByIdAndUpdate(req.params.id, {
      $set: pin,
    });

    res.status(200).json(pin);
  } catch (err) {
    next(err);
  }
});

//UPDATE PIN IMAGE
router.put("/image/:id", upload.single("image"), async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const pin = await Pin.findById(req.params.id);
    if (pin) {
      pin.img = url + "/Images/" + req.file.filename || pin.img;
    }
    await Pin.findByIdAndUpdate(req.params.id, {
      $set: pin,
    });
    res.status(200).json(pin);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
