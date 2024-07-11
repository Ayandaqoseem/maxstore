import express from "express";
import formidable from "express-formidable";


const router = express.Router();



import { isAdmin, requireSignin } from "../middlewares/auth.js";



import {
    create,
    list,
    photo,
    remove,
    update,
    read
} from "../controllers/slide.js"




router.post("/slide", requireSignin, isAdmin, formidable(), create);
router.get("/slides", list);
router.get("/slide/:slug", read);
router.get("/slide/photo/:slideId", photo);
router.put("/slide/:slideId", requireSignin, isAdmin, formidable(), update);
router.delete("/slide/:slideId", requireSignin, isAdmin, remove);

export default router;