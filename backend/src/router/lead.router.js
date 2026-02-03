import express from "express";
import verifyToken from "../middlewares/auth.js";
import { createLead, deleteLead, getAllLeads } from "../controller/lead.controller.js";

const router = express.Router();

router.post("/create",verifyToken, createLead);
router.get("/getAll",getAllLeads);
router.delete("/delete/:id",verifyToken,deleteLead);

export default router;