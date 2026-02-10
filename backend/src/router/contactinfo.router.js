import express from "express";
import { createContactInfo, deleteContactInfo, getAllContactInfo, updateContactInfo } from "../controller/conatctinfo.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/create",verifyToken,createContactInfo);
router.get("/getAll",getAllContactInfo);
router.put("/update/:id",verifyToken,updateContactInfo);
router.delete("/delete/:id",verifyToken,deleteContactInfo);

export default router;