import express from "express";

const router = express.Router();


// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import { 
    create,
    update,
    remove,
    list,
    read,
    getSubCategory
 } from "../controllers/category.js"


router.post("/category", requireSignin, isAdmin, create);
router.put("/category/:categoryId", requireSignin, isAdmin, update);
router.delete("/category/:slug", requireSignin, isAdmin, remove);
router.get("/categories", list);
router.get("/category/:slug", read);

// to get subcategory of a picked category
router.get("/category/subCategory/:subCategoryId", getSubCategory);

export default router;