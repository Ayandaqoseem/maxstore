import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [3, "Too short"],
        maxLength: [32, "Too long"],
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
},
{ timestamps: true }
);

export default mongoose.model("Category", categorySchema);