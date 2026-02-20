import express from "express"
import { createNotification, getNotifications, markAsRead } from "../controller/notification.controller.js";

const router = express.Router();

router.post("/create",createNotification);
router.get("/get", getNotifications);
router.put("/read/:id", markAsRead);

export default router;