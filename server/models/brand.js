import mongoose from "mongoose";


const brandSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: "Name is required",
        minlength: [2, "Too short"],
        maxlength: [32, "Too long"],
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Brand", brandSchema);