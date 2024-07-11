import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: [Object],
      required: true,
      ref: "User",
    },
    orderDate: {
      type: String,
      required: [true, "Please add an order date"],
      trim: true,
    },
    orderTime: {
      type: String,
      required: [true, "Please add an order date"],
      trim: true,
    },
    orderAmount: {
      type: Number,
      required: [true, "Please add an order amount"],
      trim: true,
    },
    orderStatus: {
      type: String,
      required: [true, "Please add an order status"],
      trim: true,
      // default: "Order Placed",
      // enum: ["Order placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    cartItems: {
      type: [Object],
      required: [true],
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    coupon: {
      type: Object,
      required: true,
      default: {
        name: "nil",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
