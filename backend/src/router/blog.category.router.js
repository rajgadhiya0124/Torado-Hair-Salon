import express from "express"
import { createBlogCategory, deleteBlogCategory, getAllBlogCategory, updateBlogCategory, updateBlogCategoryStatus } from "../controller/blog.category.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/create",verifyToken,createBlogCategory);
router.get("/getall",getAllBlogCategory);

router.put("/updateStatus/:id",verifyToken,updateBlogCategoryStatus); //update blogcatrgory status(active/deactive)

router.put("/update/:id",verifyToken,updateBlogCategory);
router.delete("/delete/:id",verifyToken,deleteBlogCategory);

export default router;