import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createGalleryCat, deleteGalleryCat, getAllGalleryCat, updateGalleryCatStatus } from "../controller/gallery.category.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createGalleryCat);
router.get("/getall",getAllGalleryCat);

router.put("/updateStatus/:id",verifyToken,updateGalleryCatStatus);

router.delete("/delete/:id",verifyToken,deleteGalleryCat);

export default router;