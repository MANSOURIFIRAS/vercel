const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema(
  {
    totalPrice: { type: String, required: false },
    status: { type: Boolean, default: false, required: false },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        type: { type: String, require: true },
        product: { type: mongoose.Schema.Types.ObjectId },
        quantity: { type: Number, required: true },
      },
    ],

    deliveryPlace: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const commandModel = mongoose.model("Command", commandSchema);
module.exports = commandModel;
