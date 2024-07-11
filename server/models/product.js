import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema;


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please add a name"],
        maxLength: 32,
        text: true,
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
    },
    sku: {
        type: String,
        required: true,
        default: "SKU",
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000,
        text: true,
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Please add a price"]
    },
    regularPrice: {
        type: Number,
        trim: true,
        // required: [true, "Please add a price"]
    },
    category: {
        type: String,
        required: [true, "Please add a categry"],
        trim: true,
    },
    // category: {
    //     type: ObjectId,
    //     ref: "Category",
    //     required: true,
    // },
    // subCategory: {
    //     type: ObjectId,
    //     ref: "SubCategory",
    //     required: true
    // },
    brand: {
        type: String,
        required: [true, "Please add a brand"],
        trim: true,
    },
    color: {
        type: String,
        // required: [true, "Please add a color"],
        default: "As seen",
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, "Please add a quantity"],
        trim: true,
    },
    sold: {
        type: Number,
        default: 0,
        trim: true
    },
    photo: {
        type: [String]
    },
    shipping: {
        required: false,
        type: Boolean,
    },
    ratings: {
      type: [Object],
    }
},
{ timestamps: true } 
);

export default mongoose.model("Product", productSchema);