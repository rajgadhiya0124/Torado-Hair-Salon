import express from "express";
import { createContacus, deletContactUs, getAllContactUs } from "../controller/contactus.controller.js";
import { deleteContactInfo } from "../controller/conatctinfo.controller.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.post("/create",verifyToken,createContacus);
router.get("/getAll",getAllContactUs);
router.delete("/delete/:id",verifyToken,deletContactUs);

export default router;