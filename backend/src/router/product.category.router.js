import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createProductCat, deleteProductCat, GetAllProductCat, updateProductCat, updateProductCatStatus } from "../controller/product.category.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createProductCat);
router.get("/getall",GetAllProductCat);

router.put("/updateStatus/:id",verifyToken,updateProductCatStatus);

router.put("/update/:id",verifyToken,updateProductCat);
router.delete("/delete/:id",verifyToken,deleteProductCat);

export default router;