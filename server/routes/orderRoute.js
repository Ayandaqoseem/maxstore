import express from "express";
import { isAdmin, requireSignin } from "../middlewares/auth.js";

const router = express.Router();

import {
  UpdateOrderStatus,
  createOrder,
  getOrder,
  getOrders,
  getAllOrders,
  payWithStripe,
  verifyFlwPayment,
  payWithWallet,
} from "../controllers/order.js";

router.post("/order", requireSignin, createOrder);
router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin, getAllOrders);
router.get("/order/:id", requireSignin, getOrder);
router.patch("/order/:id", requireSignin, isAdmin, UpdateOrderStatus);


router.post("/create-payment-intent", payWithStripe)
router.post("/payWithWallet", requireSignin, payWithWallet);
router.get("/response", verifyFlwPayment);

export default router;
