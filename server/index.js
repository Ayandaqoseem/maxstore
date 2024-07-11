import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import slideRoutes from "./routes/slide.js";
import brandRoutes from "./routes/brand.js";
import orderRoutes from "./routes/orderRoute.js"
import transactionRoutes from "./routes/transaction.js";
import couponRoutes from "./routes/coupon.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";





dotenv.config();


const app = express();

// db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB Connected");
})
.catch(err => console.log("DB ERROR => ", err));


// middlewares
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://maxstoreapp.vercel.app"],
    credentials: true,
}));
app.use(morgan("dev"));


app.use("/api/transaction", transactionRoutes);
app.use(express.json());



// router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
// app.use("/api",  subCategoryRoutes);
app.use("/api", slideRoutes);
app.use("/api", brandRoutes);
app.use("/api", couponRoutes);
app.use("/api", orderRoutes);


const port = process.env.PORT || 8524;
app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});