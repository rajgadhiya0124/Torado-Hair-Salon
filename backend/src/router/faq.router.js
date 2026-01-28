import express from "express"
import { createFaq, deleteFaq, getAllFaq, updateFaq } from "../controller/faq.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/create",verifyToken,createFaq);
router.get("/getAll" ,getAllFaq);
router.put("/update/:id",verifyToken,updateFaq);
router.delete("/delete/:id",verifyToken,deleteFaq);

export default router;