import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createAppointment, deleteAppointment, getAllAppointment, updateAppoinmentStatus } from "../controller/appointment.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createAppointment);
router.get("/getAll",getAllAppointment);

router.put("/statusupdate/:id",verifyToken,updateAppoinmentStatus);

router.delete("/delete/:id",verifyToken,deleteAppointment);

export default router;