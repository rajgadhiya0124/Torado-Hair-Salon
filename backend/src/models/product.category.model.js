import db from "../config/db.js";


export const ProductCategoryModel = {

    createProductCategory: async(data)=>{
        const {category_name, category_slug, createdBy} = data;

        const [rows] = await db.query("CALL sp_create_product_category(?,?,?)",
            [category_name, category_slug, createdBy]
        );

        return rows;
    },

    getAllProductCategory : async()=>{

        const [result] = await db.query("CALL sp_get_all_product_category()");
        return result[0];
    },

    updateProductCatStatus: async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_toggle_product_category_status(?,?)",
            [id,updatedBy]
        );
        return result[0];
    },

    updateProductCategory : async(data)=>{
        const {id,category_name,category_slug,updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_product_category(?,?,?,?)",
            [id,category_name,category_slug,updatedBy]
        );

        return rows;
    },

    deleteProductCategory : async(data)=>{
        const {id , updatedBy } = data;

        const [rows] = await db.query("CALL sp_delete_product_category (?,?)",
            [id, updatedBy]
        );

        return rows;
    }
}