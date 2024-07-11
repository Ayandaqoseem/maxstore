import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: [true, "Please add coupon name"],
      minlength: [6, "Coupon must be up to 6 characters"],
      maxlength: [12, "Coupon must not be more than 12"],
    },
    discount: {
      type: Number,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
