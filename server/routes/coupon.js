import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

import { 
                    create, 
                    list, 
                    read,
                    remove
} from "../controllers/coupon.js";

router.post("/coupon", requireSignin, isAdmin, create);
router.get("/coupons", requireSignin, isAdmin, list);
router.get("/coupon/:couponName", requireSignin, read);
router.delete("/coupon/:id", requireSignin, isAdmin, remove);

export default router;
