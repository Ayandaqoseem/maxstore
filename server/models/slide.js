import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema;


const slideSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        text: true,
    },
    // description: {
    //     type: String,
    //     required: true,
    //     maxLength: 2000,
    //     text: true,
    // },
    // price: {
    //     type: Number,
    //     trim: true,
    //     required: true,
    // },
    // brand: {
    //     type: String,
    //     text: true,
    //     maxLength: 32,
    // },
    // color: {
    //     type: String,
    //     text: true,
    //     maxLength: 32,
    // },
    // quantity: {
    //     type: Number,
    // },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
   
},
{ timestamps: true } 
);

export default mongoose.model("Slide", slideSchema);