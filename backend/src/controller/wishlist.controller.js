import { wishlistModel } from "../models/wishlist.model.js";

//creat wishlist
export const createWishlist = async (req, res) => {
    try {

        const data = {
            user_id: req.user.id,  
            product_id: req.body.product_id,
            createdBy: req.user ? req.user.id : null,
        };

        await wishlistModel.createWishlist(data);

        res.status(200).json({
            success: true,
            message: "Product added to wishlist"
        });

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get wishlist by user
export const getWishlistByUser = async (req, res) => {
    try {

        const user_id = req.user.id; //from token

        const result = await wishlistModel.getwishlistByUser(user_id);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get wishlist count by user
export const getWishlistCount = async (req, res) => {
    try {

        const user_id = req.user.id;
        const count = await wishlistModel.getWishlistCount(user_id);

        res.status(200).json({
            success: true,
            data: count
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//delete wishlist 
export const deleteWishlist = async (req, res) => {
    try {

        const data = {
            user_id: req.user.id,
            product_id: req.body.product_id,
            updatedBy: req.user ? req.user.id : null
        };

        await wishlistModel.deleteWishlist(data);

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};