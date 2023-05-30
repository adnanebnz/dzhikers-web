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
let endpointSecret;
// endpointSecret =
//   "whsec_e320ee1663feae65f2a7ccd7892f16624800edc7275ef0f6fd9124a12f235989";
router.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];
  let eventType;
  let data;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then((customer) => {
      console.log("customer", customer);
      console.log("data", data);
      const newOrder = new Order({
        userId: customer.metadata.userId,
        products: JSON.parse(customer.metadata.cart),
        total: data.amount_total / 100,
        billingAddress: {
          city: data.customer_details.address.city,
          firstName: data.customer_details.name.split(" ")[0],
          lastName: data.customer_details.name.split(" ")[1],
          street1: data.customer_details.address.line1,
          street2: data.customer_details.address.line2,
          zipCode: data.customer_details.address.postal_code,
        },
        phoneNumber: data.customer_details.phone,
        emailAddress: data.customer_details.email,

        delivery_status: "pending",
        payment_status: "payed",
      });
      newOrder.save();
      JSON.parse(customer.metadata.cart).forEach(async (item) => {
        await updateStock(item._id, item.count);
      });
    });
    // create order
  }

  res.status(200).json({ received: true }).end();
});

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cart),
    },
  });
  const line_items = req.body.cart.map((item) => {
    return {
      price_data: {
        currency: "dzd",
        product_data: {
          name: item.title,
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
    customer: customer.id,
    line_items,
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["DZ"],
    },
    phone_number_collection: {
      enabled: true,
    },
    success_url: "https://dzhikers-web.vercel.app/checkout/success",
    cancel_url: "https://dzhikers-web.vercel.app/checkout/cancel",
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
