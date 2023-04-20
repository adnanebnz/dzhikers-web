const router = require("express").Router();
const Announce = require("../models/Announce");
const Reservation = require("../models/Reservation");
const Pin = require("../models/Pin");
const User = require("../models/User");
const { Expo } = require("expo-server-sdk");

router.get("/notifs/:userId", async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId });
    const announces = await Announce.find({
      hikeId: { $in: reservations.map((r) => r.hikeId) },
    });
    const hikeInfos = await Pin.find({
      _id: { $in: announces.map((a) => a.hikeId) },
    });
    res.status(200).json({ announces, hikeInfos });
  } catch (err) {
    next(err);
  }
});

router.delete("/notifs/:id", async (req, res, next) => {
  try {
    const announce = await Announce.findById(req.params.id);
    await announce.remove();
    res.status(200).json({ message: "Announce deleted" });
  } catch (err) {
    next(err);
  }
});

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

    //get all participants TO SEND THEM NOTIFICATIONS
    const reservations = await Reservation.find({
      hikeId: announce.hikeId,
    });
    const participants = reservations.map((r) => r.userId);
    const participantsTokens = await User.find({
      _id: { $in: participants },
    }).select("hardwareToken");
    const tokens = participantsTokens
      .map((t) => t.hardwareToken)
      .filter((t) => t !== null)
      .flat();

    // send push notification
    const expo = new Expo();
    const messages = [];
    for (let pushToken of tokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken,
        sound: "default",
        title: announce.title,
        body: announce.description,
      });
    }
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();
    const receiptIds = [];
    for (let ticket of tickets) {
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }
    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
      for (let chunk of receiptIdChunks) {
        try {
          const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
          console.log(receipts);
          for (let receipt of receipts) {
            if (receipt.status === "ok") {
              continue;
            } else if (receipt.status === "error") {
              console.error(
                `There was an error sending a notification: ${receipt.message}`
              );
              if (receipt.details && receipt.details.error) {
                console.error(`The error code is ${receipt.details.error}`);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();

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
