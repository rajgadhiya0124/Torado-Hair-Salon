import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createOrder, deleteOrder, getAllorder, getorderById, getOrderDetails, getUserOrdersList, updateOrder, updateOrderStatus } from "../controller/order.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createOrder);
router.get("/getall",getAllorder);
router.get("/getorderById/:order_id",getorderById);

router.put("/updateStatus/:id",verifyToken,updateOrderStatus);

router.put("/update/:order_id",verifyToken,updateOrder);
router.delete("/delete/:order_id",verifyToken,deleteOrder);

router.get("/get/userorder",verifyToken,getUserOrdersList); //get order list
router.get("/get/orderDetails/:order_id",verifyToken,getOrderDetails); //order details

export default router;