const Order = require("../models/Order");
const Item = require("../models/Item");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router = require("express").Router();

async function updateStock(_id, quantity) {
  const product = await Item.findById(_id);
  product.quantity -= quantity;

  await product.save();
}
async function increaseStock(_id, quantity) {
  const product = await Item.findById(_id);
  product.quantity += quantity;

  await product.save();
}

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cart.map((item) => {
    return {
      price_data: {
        currency: "dzd",
        product_data: {
          name: item.title,
          description: item.desc,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.count,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: "https://dzhikers.live/checkout/success",
    cancel_url: "https://dzhikers.live/checkout/cancel",
  });

  res.send({ url: session.url });
});

//TODO
router.post("/create-order", async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    newOrder.products.forEach(async (o) => {
      await updateStock(o._id, o.count);
    });
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    order.products.forEach(async (o) => {
      await increaseStock(o._id, o.count);
    });
    await Order.findOneAndDelete({ _id: req.params.id });
    res.status(200).json("Order Deleted");
  } catch (err) {
    next(err);
  }
});

router.delete("/admin/:id", async (req, res, next) => {
  try {
    await Order.findOneAndDelete({ _id: req.params.id });
    res.status(200).json("Order Deleted");
  } catch (err) {
    next(err);
  }
});

//modify order
router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Ordeer not found" });
    }
    order.delivery_status = req.body.delivery_status;
    order.payment_status = req.body.payment_status;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
