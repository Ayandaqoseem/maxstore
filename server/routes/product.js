import express from "express";
import { isAdmin, requireSignin } from "../middlewares/auth.js";
// import formidable from "express-formidable";
import { 
    create,
    list,
    read,
    remove,
    update,
    productReview, 
    deleteReview,
    updateReview
} from "../controllers/product.js";


const router = express.Router();

router.post("/product", requireSignin, isAdmin,  create);
router.get("/products", list);
router.get("/product/:productId", read);
// router.get("/product/photo/:productId", photo);
router.delete("/product/:id", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, update);


// rating
router.put("/product/review/:id", requireSignin, productReview);
router.patch("/product/deleteReview/:id", requireSignin, deleteReview );
router.patch("/product/updateReview/:id", requireSignin, updateReview)

export default router;