const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  itemNames: { type: Schema.Types.String },
  productIds: [{ type: Schema.Types.ObjectId, ref: "product" }],
  quantity: { type: Schema.Types.Number },
  totalPrice: { type: Schema.Types.String },
  orderStatus: { type: Schema.Types.String, enum: ["Processing", "Shipped", "Delivered"], default: "Processing" },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
