import express from "express"
import { createBlogCategory, deleteBlogCategory, getAllBlogCategory, updateBlogCategory } from "../controller/blog.category.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/create",verifyToken,createBlogCategory);
router.get("/getall",getAllBlogCategory);
router.put("/update/:id",verifyToken,updateBlogCategory);
router.delete("/delete/:id",verifyToken,deleteBlogCategory);

export default router;