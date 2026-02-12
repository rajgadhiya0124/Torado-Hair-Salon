import express from "express"
import verifyToken from "../middlewares/auth.js";
import { cretaeBlogTag, deleteBlogTag, getAllBlogTag, updateBlogTag, updateBlogtagStatus } from "../controller/blog.tag.controller.js";
import { updateBlogCategoryStatus } from "../controller/blog.category.controller.js";

const router = express.Router();

router.post("/create",verifyToken,cretaeBlogTag);
router.get("/getall",getAllBlogTag);

router.put("/updateStatus/:id",verifyToken,updateBlogtagStatus) //update blog tag status

router.put("/update/:id",verifyToken,updateBlogTag);
router.delete("/delete/:id",verifyToken,deleteBlogTag);

export default router;