import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createNewsletter, deleteNewletter, getAllNewsletter } from "../controller/newsletter.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createNewsletter);
router.get("/getall",getAllNewsletter);
router.delete("/delete/:id",verifyToken,deleteNewletter);

export default router;