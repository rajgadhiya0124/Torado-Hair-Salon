import expres from "express";
import { getBeastPriceService } from "../controller/home.bestservice.controller.js";

const router = expres.Router();

router.get("/get",getBeastPriceService);

export default router;