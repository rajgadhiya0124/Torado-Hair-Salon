import db from "../config/db.js";

export const wishlistModel = {

    createWishlist : async(data)=>{
        const {user_id, product_id, createdBy} = data;

        const [rows] = await db.query("CALL sp_create_wishlist(?,?,?)",
            [user_id, product_id, createdBy]
        );
        return rows;
    },

    getwishlistByUser: async(user_id)=>{
        const [result] = await db.query("CALL sp_get_wishlist_by_user(?)",
            [user_id]
        );
        return result[0];
    },

    getWishlistCount: async(user_id)=>{
        const [result] = await db.query("CALL sp_get_wishlist_count(?)",
            [user_id]
        );
        return result[0][0];
    },

    // Delete Wishlist
    deleteWishlist: async (data) => {
        const { user_id, product_id, updatedBy } = data;

        const [rows] = await db.query("CALL sp_delete_wishlist(?,?,?)",
            [user_id, product_id, updatedBy]
        );

        return rows;
    }

}