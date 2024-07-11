import express from "express";
import { isAdmin, requireSignin } from "../middlewares/auth.js";



const router = express.Router();


import { 
    create,
    update,
    remove,
    list,
    read
 } from "../controllers/subCategory.js";

router.post("/sub-category", requireSignin, isAdmin, create);
router.put("/sub-category/:subCategoryId", requireSignin, isAdmin, update);
router.delete("/sub-category/:subCategoryId", requireSignin, isAdmin, remove);
router.get("/sub-categories", list);
router.get("/sub-category/:slug", read);

export default router;