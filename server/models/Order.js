const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket"
    }
  ],
  userInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
