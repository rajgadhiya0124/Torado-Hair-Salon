import express from "express"
import verifyToken from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import { createGallery, deleteGallery, getAllGallery, getGalleryById, updateGallery, updateGalleryStatus } from "../controller/gallery.controller.js";

const router = express.Router();

router.post("/create",verifyToken,upload("gallery").single("service_image"), createGallery);
router.get("/getAll", getAllGallery);
router.get("/getById/:id",getGalleryById);

router.put("/updateStatus/:id",verifyToken,updateGalleryStatus);

router.put("/update/:id",verifyToken,upload("gallery").single("service_image"),updateGallery);
router.delete("/delete/:id",verifyToken,deleteGallery);

export default router;
