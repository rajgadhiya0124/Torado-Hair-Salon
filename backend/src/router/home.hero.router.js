import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createHero, deleteHomeHero, getHomeHero, updateHomeHero } from "../controller/home.hero.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create",verifyToken,upload("home/hero").fields([
    {name:"logo_image",maxCount:1},
    {name:"hero_image",maxCount:1},
    {name:"background_image",maxCount:1}
]),createHero);

router.get("/get",getHomeHero);

router.put("/update/:id",verifyToken,upload("home/hero").fields([
    {name:"logo_image",maxCount:1},
    {name:"hero_image",maxCount:1},
    {name:"background_image",maxCount:1}
]),updateHomeHero);

router.delete("/delete/:id",verifyToken,deleteHomeHero);

export default router;