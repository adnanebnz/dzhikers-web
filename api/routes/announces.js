const router = require("express").Router();
const Announce = require("../models/Announce");
router.get("/:hikeId", async (req, res, next) => {
  try {
    await Announce.find({ hikeId: req.params.hikeId });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const announce = new Announce(req.body);
    await announce.save();
    res.status(201).json(announce);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const announce = await Announce.findById(req.params.id);
    if (!announce) {
      return res.status(404).json({ message: "Announce not found" });
    }
    announce.title = req.body.title;
    announce.description = req.body.description;
    announce.date = req.body.date;
    await announce.save();
    res.status(200).json(announce);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
