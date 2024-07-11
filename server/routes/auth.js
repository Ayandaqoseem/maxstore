import express from "express";

const router = express.Router();

// middlewares
import { isAdmin, requireSignin} from "../middlewares/auth.js";
// controller 
import { 
    register, 
    login,
    authCheck,
    adminCheck,
    saveCart,
    getCart,
    getUser,
    update,
    updatePhoto,
    getLoginStatus,
    logout,
} from "../controllers/auth.js"


router.post("/register", register);
router.post("/login", login);
router.get("/get-user", requireSignin, getUser);
router.get("/logout", logout)
router.get("/get-login-status", getLoginStatus);
router.get("/auth-check", requireSignin, authCheck);
router.get("/admin-check", requireSignin, isAdmin, adminCheck);
router.patch("/update-user", requireSignin, update);
router.patch("/update-photo", requireSignin, updatePhoto)

// Cart
router.get("/getCart", requireSignin, getCart)
router.patch("/saveCart", requireSignin, saveCart);

export default router;