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
    name: String,
    email: String,
    phone: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
