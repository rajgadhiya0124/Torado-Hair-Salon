import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createWishlist, deleteWishlist, getWishlistByUser, getWishlistCount } from "../controller/wishlist.controller.js";

const router = express.Router();

router.post("/add",verifyToken, createWishlist);
router.get("/getByuser",verifyToken, getWishlistByUser);

router.get("/get/wishlistcount",verifyToken,getWishlistCount);

router.delete("/remove",verifyToken, deleteWishlist);

export default router;