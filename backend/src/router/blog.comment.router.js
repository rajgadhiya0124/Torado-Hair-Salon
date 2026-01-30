import express from "express"
import { createBlogComment, deleteBlogComment, getCommentByblogId } from "../controller/blog.comment.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/create",verifyToken, createBlogComment);
router.get("/getAllComment/:blog_id", getCommentByblogId);
router.delete("/delete/:id",verifyToken,deleteBlogComment);

export default router;