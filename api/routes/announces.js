const router = require("express").Router();
const Announce = require("../models/Announce");
const Pin = require("../models/Pin");
router.get("/:hikeId", async (req, res, next) => {
  try {
    const announce = await Announce.find({ hikeId: req.params.hikeId });
    const hike = await Pin.findById(req.params.hikeId);
    res.status(200).json({ announce, hike });
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
    await announce.save();
    res.status(200).json(announce);
  } catch (err) {
    next(err);
  }
});
//delete an announce
router.delete("/:id", async (req, res, next) => {
  try {
    const announce = await Announce.findById(req.params.id);
    if (!announce) {
      return res.status(404).json({ message: "Announce not found" });
    }
    await announce.delete();
    res.status(200).json({ message: "Announce deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
