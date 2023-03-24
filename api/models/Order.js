const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: "Item",
        },
        title: { type: String },
        quantity: { type: Number },
        count: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
    total: { type: Number, required: true },
    billingAddress: {
      city: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      street1: { type: String, required: true },
      street2: { type: String },
      zipCode: { type: Number },
    },
    phoneNumber: { type: Number, required: "true" },
    emailAddress: { type: String, required: "true" },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, default: "not payed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
