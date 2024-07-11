import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a category"]
    }
});

export default mongoose.model("Products", productSchema);