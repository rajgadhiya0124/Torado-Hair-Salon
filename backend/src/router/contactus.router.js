import express from "express";
import { createContacus, deletContactUs, getAllContactUs } from "../controller/contactus.controller.js";
import { deleteContactInfo } from "../controller/conatctinfo.controller.js";

const router = express.Router();

router.post("/create",createContacus);
router.get("/getAll",getAllContactUs);
router.delete("/delete/:id",deletContactUs);

export default router;