import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/product.controller.js";
import {upload} from "../middlewares/multer.js"
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/create",verifyToken,upload("product").single("product_image"),createProduct);
router.get("/getAll",getAllProducts);
router.get("/getById/:id",getProductById);

router.put("/update/:id",verifyToken,upload("product").single("product_image"),updateProduct);
router.delete("/delete/:id",verifyToken,deleteProduct);

export default router;