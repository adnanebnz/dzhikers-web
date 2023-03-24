const router = require("express").Router();
const Contact = require("../models/Contact");
const { sendMessage } = require("../utils/sendFormMessage");

router.post("/", async (req, res) => {
  const newContact = new Contact(req.body);
  try {
    const savedContact = await newContact.save();
    // sendMessage(req.body.email, req.body.msg);
    res.status(200).json(savedContact);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res, next) => {
  const contacts = await Contact.find();
  try {
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
