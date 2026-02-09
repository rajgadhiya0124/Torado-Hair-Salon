import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createHomeAbout, deleteHomeAbout, getHomeAbout, updateHomeAbout } from "../controller/home.aboutus.controller.js";
import { upload } from "../middlewares/multer.js";

const router= express.Router();

router.post("/create",verifyToken,upload("/home/about").single("about_image"),createHomeAbout);
router.get("/get",getHomeAbout);
router.put("/update/:id",verifyToken,upload("/home/about").single("about_image"),updateHomeAbout);
router.delete("/delete/:id",verifyToken,deleteHomeAbout);

export default router;