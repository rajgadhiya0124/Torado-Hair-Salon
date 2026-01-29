import express from "express";
import verifyToken from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import { creatBlogAuthor, deleteBlogAuthor, getAllBlogAuthor, updateBlogAuthor } from "../controller/blog.author.controller.js";

const router = express.Router();

router.post("/create",verifyToken,upload("blog/author").single("author_image"),creatBlogAuthor)
router.get("/getall",getAllBlogAuthor);
router.put("/update/:id",verifyToken,upload("blog/author").single("author_image"), updateBlogAuthor);
router.delete("/delete/:id",verifyToken,deleteBlogAuthor);

export default router;