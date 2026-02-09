import db from "../config/db.js";


export const ProductModel = {
    createProduct: async(data)=>{
        const {category_id, tag_id, product_name, product_image,
        price, discount_price, product_description, additional_information, stock,createdBy} = data;

        const[rows] = await db.query("CALL sp_create_product(?,?,?,?,?,?,?,?,?,?)",
            [category_id, tag_id, product_name, product_image,
            price, discount_price, product_description, additional_information, stock,createdBy]
        );

        return rows;
    },

    getAllProduct: async()=>{
        const [result] = await db.query("CALL sp_get_all_products ()");

        return result[0];
    },

    getProductById: async(id)=>{
        const [result] = await db.query("CALL sp_get_product_by_id (?)",
            [id]
        );

        return result[0][0];
    },

    updateProduct: async(data)=>{
        const {id ,category_id, tag_id, product_name, product_image,
        price, discount_price, product_description, additional_information, stock,updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_product(?,?,?,?,?,?,?,?,?,?,?)",
            [id ,category_id, tag_id, product_name, product_image,
            price, discount_price, product_description, additional_information, stock,updatedBy]
        );

        return rows;
    },

    deleteProduct : async(data)=>{
        const {id, updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_product(?,?)",
            [id,updatedBy]
        );

        return rows;
    },

    getbestsellingProduct: async()=>{
        const [result] = await db.query("CALL sp_get_best_selling_products()");

        return result[0];
    }
}