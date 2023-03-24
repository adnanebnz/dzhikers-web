const router = require("express").Router();
const Pin = require("../models/Pin");
const multer = require("multer");
const path = require("path");

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
    rating: req.body.rating,
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

//get all pins

router.get("/", async (req, res, next) => {
  try {
    const level = req.query.level;
    if (level !== "all") {
      const pins = await Pin.find({
        level: level,
      });
      res.status(200).json(pins);
    } else if (level === "all") {
      const pins = await Pin.find();
      res.status(200).json(pins);
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
    res.status(200).json("pin deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
