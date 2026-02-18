import db from "../config/db.js"

export const OrderModel = {
    //create order
    createOrder: async(data)=>{
        const { user_id, first_name, last_name, email, phone, company_name,country, address,
        city, state, zip, order_notes, total_amount, payment_method, createdBy} = data;

        const [rows] = await db.query("CALL sp_create_order(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [ user_id, first_name, last_name, email, phone, company_name,country, address,
                city, state, zip, order_notes, total_amount, payment_method, createdBy]
        )

        return rows[0][0];
    },

    addOrderItems: async(item)=>{
        const  { order_id, product_id, price, quantity,total, createdBy} = item;

        await db.query("CALL sp_add_order_item(?,?,?,?,?,?)",
            [order_id, product_id, price, quantity,total, createdBy]
        );
    },

    getAllOrders: async()=>{
        const [result] = await db.query("CALL sp_get_all_orders()");

        return result[0];
    },

    getOrderById : async(order_id)=>{
        const [result] = await db.query("CALL sp_get_order_by_id(?)",
            [order_id]
        )

        const order = result[0][0];
        const items = result[1]

        return {order,items}
    },

    updateOrderStaus: async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_toggle_order_status(?,?)",
            [id,updatedBy]
        );
        return result[0];
    },

    updateOrder: async(data)=>{
        const {order_id,payment_status,order_status,updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_order(?,?,?,?)",
            [order_id,payment_status,order_status,updatedBy]
        );

        return rows;
    },

    deleteOrder: async(order_id)=>{

        const [rows] = await db.query("CALL sp_delete_order(?)",
            [order_id]
        );

        return rows;
    }
}