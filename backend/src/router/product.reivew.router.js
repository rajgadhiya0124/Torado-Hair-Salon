import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createProductReview, getProductAllReview } from "../controller/product.review.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createProductReview);
router.get("/getAllReview/:ProductId",getProductAllReview);

export default router;