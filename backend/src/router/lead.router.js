import express from "express";
import verifyToken from "../middlewares/auth.js";
import { createLead, deleteLead, getAllLeads, updateLeadStatus, updateleadtoogleStaus } from "../controller/lead.controller.js";

const router = express.Router();

router.post("/create",verifyToken, createLead);
router.get("/getAll",getAllLeads);

router.put("/updateStatus/:id",verifyToken,updateleadtoogleStaus);  //acive/deactive 0 or 1
router.put("/update/:id",verifyToken,updateLeadStatus); //lead_status(new,contected)

router.delete("/delete/:id",verifyToken,deleteLead);

export default router;