import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createProductTag, deleteProductTag, getAllProductTag, updateProductTag } from "../controller/product.tag.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createProductTag);
router.get("/getAll",getAllProductTag);
router.put("/update/:id",verifyToken,updateProductTag);
router.delete("/delete/:id" ,verifyToken,deleteProductTag);

export default router;