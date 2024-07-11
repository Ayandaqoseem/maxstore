import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",
        ]
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 64,
    },
    address: {
        type: String,
        trim: true,
    },
    cartItems: {
        type: [Object],
    },
    role: {
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer", "admin"],

    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",

    },
    phone: {
        type: String,
        default: "+234",
    },
    balance: {
        type: Number,
        default: 0,
    },
    address: {
        type: Object,
    },
    stripeCustomerId: {
        type: String,
    }
    // wishlist: [{ type: ObjectId, ref: "Product" }],
},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);