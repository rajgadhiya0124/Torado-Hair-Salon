import express from "express"
import { dashBoardCount, getMonthlyOrder, getRecentLeads, getRecentOrder, getTodayAppointment, getWeeklyAppointment } from "../controller/dashboard.controller.js";

const router = express.Router();

router.get("/getCount", dashBoardCount);
router.get("/get/weekly-appointment",getWeeklyAppointment);
router.get("/get/monthly-order",getMonthlyOrder);
router.get("/get/today-appointment",getTodayAppointment);
router.get("/get/recent-order",getRecentOrder);
router.get("/get/recent-leads",getRecentLeads);

export default router;