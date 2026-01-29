import express from "express"
import verifyToken from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import { CreateBlog, deleteBlog, getAllBlog, getBlogById, updateBlog } from "../controller/blog.controller.js";

const router = express.Router();

router.post("/create",verifyToken,upload("blog").single("blog_image"), CreateBlog);

router.get("/getAll",getAllBlog);
router.get("/getById/:BlogId",getBlogById);

router.put("/update/:BlogId",verifyToken,upload("blog").single("blog_image"),updateBlog);

router.delete("/delete/:BlogId",verifyToken,deleteBlog);

export default router;

