import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createProductReview, deleteProductReview, getAllReview, getProductAllReview } from "../controller/product.review.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createProductReview);
router.get("/getall",getAllReview);
router.get("/getAllReview/:ProductId",getProductAllReview);

router.delete("/delete/:id",verifyToken,deleteProductReview);

export default router;