import express from "express";
import { depositFundFLW, depositFundStripe, getUserTransactions, transferFund, verifyAccount, webhook } from "../controllers/transaction.js";
import { requireSignin } from "../middlewares/auth.js";

const router = express.Router();


router.post("/transferFund", express.json(), requireSignin, transferFund)
router.post("/verifyAccount", express.json(), requireSignin, verifyAccount)

router.get("/getUserTransactions", express.json(), requireSignin, getUserTransactions)



router.post("/depositFundStripe", express.json(), requireSignin, depositFundStripe)
router.post ("/webhook", express.raw({ type: "application/json" }), webhook);
router.get("/depositFundFLW", express.json(), depositFundFLW);


export default router;