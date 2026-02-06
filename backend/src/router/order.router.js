import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createOrder, deleteOrder, getAllorder, getorderById, updateOrder } from "../controller/order.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createOrder);
router.get("/getall",getAllorder);
router.get("/getorderById/:order_id",getorderById);
router.put("/update/:order_id",verifyToken,updateOrder);
router.delete("/delete/:order_id",verifyToken,deleteOrder);

export default router;