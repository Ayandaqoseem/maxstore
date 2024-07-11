import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;


const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, "Too short"],
        maxLength: [32, "Too long"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
},
{ timestamps: true }
)

export default mongoose.model("SubCategory", subcategorySchema);