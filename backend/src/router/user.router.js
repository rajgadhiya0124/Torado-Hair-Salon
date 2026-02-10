import express from "express"
import { createUser, deleteUser, getAllAdmimUser, getAlluser, loginUser } from "../controller/user.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/getall",getAlluser);

router.get("/admingetall",getAllAdmimUser);

router.delete("/delete/:userId",verifyToken,deleteUser);

export default router;