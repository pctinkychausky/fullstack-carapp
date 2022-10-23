import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerID: {
    type: String,
    required: true,
  },
  items: [{ type: mongoose.ObjectId, ref: "Car" }],
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
