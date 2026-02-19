import express from "express"
import verifyToken from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import { CreateBlog, deleteBlog, getAllBlog, getBlogByCategory, getBlogById, getBlogByTag, getPopulerblog, updateBlog, updateBlogStatus } from "../controller/blog.controller.js";

const router = express.Router();

router.post("/create",verifyToken,upload("blog").single("blog_image"), CreateBlog);

router.get("/getAll",getAllBlog);
router.get("/getById/:BlogId",getBlogById);

router.get("/getByCategory/:category_id",getBlogByCategory);   //get blog by category
router.get("/getByTag/:tag_id",getBlogByTag);  //get blog by tag
router.get("/getPopulerBlog",getPopulerblog);

router.put("/updateStatus/:id",verifyToken,updateBlogStatus)

router.put("/update/:BlogId",verifyToken,upload("blog").single("blog_image"),updateBlog);
router.delete("/delete/:BlogId",verifyToken,deleteBlog);

export default router;

