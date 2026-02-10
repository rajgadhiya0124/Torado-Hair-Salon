import express from "express"
import verifyToken from "../middlewares/auth.js"
import { createHomePartner, deleteHomePartner, getHomePartner } from "../controller/home.partner.controller.js";
import {upload} from "../middlewares/multer.js"

const router = express.Router();

router.post("/create",verifyToken,upload("home/partner").single("partner_image"),createHomePartner);
router.get("/get",getHomePartner);
router.delete("/delete/:id",verifyToken,deleteHomePartner);

export default router;