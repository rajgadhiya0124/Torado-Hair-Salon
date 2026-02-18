import { OrderModel } from "../models/order.model.js";

//create order
export const createOrder = async(req,res)=>{
    try {
        const {user_id,first_name, last_name,email,phone,company_name,country,address,city,state,
            zip, order_notes,total_amount,payment_method,order_items
        } = req.body;

        const createdBy = req.user ? req.user.id : null;

        if (!order_items || order_items.length === 0) {
            return res.status(400).json({ message: "Order items required" });
        }

        const result = await OrderModel.createOrder({user_id,first_name, last_name,email,phone,company_name,
            country,address,city,state,zip, order_notes,total_amount,payment_method,createdBy});
        
        const order_id = result.id;  //last insert row id

        //add order items
        for(let item of order_items){
            await OrderModel.addOrderItems({
                order_id: order_id,
                product_id: item.product_id,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity,
                createdBy
            })
        }

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order_id
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all orders
export const getAllorder = async(req,res)=>{
    try {
        const orders = await OrderModel.getAllOrders();

        res.status(201).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get order by id
export const getorderById = async(req,res)=>{
    try {
        const order_id = req.params.order_id;

        const oreder = await OrderModel.getOrderById(order_id);
        
        res.status(200).json({
            success: true,
            data: oreder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//update Order status
export const updateOrderStatus = async(req,res)=>{
    try {
        const data ={
            id:req.params.id,
            updatedBy: req.user? req.user.id : null,
        }

        await OrderModel.updateOrderStaus(data);

        res.status(200).json({
            success:true,
            message:"Order Status updated Sucssfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update order
export const updateOrder = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            order_id: req.params.order_id,
            updatedBy: req.user ? req.user.id : null,
        }

        await OrderModel.updateOrder(data);

        res.status(200).json({
            success: true,
            message: "Order Updated Successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete order
export const deleteOrder = async(req,res)=>{
    try {
        const order_id = req.params.order_id;

        await OrderModel.deleteOrder(order_id);

        res.status(200).json({
            success: true,
            message: "Order deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}