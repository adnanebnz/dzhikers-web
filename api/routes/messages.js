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
router.delete("/:id", async (req, res, next) => {
  try {
    const contact = Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json("Contact not found");
    } else {
      await contact.deleteOne();
      res.status(403).json("success");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
