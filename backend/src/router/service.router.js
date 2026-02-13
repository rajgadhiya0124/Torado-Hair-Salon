import express from "express"
import verifyToken from "../middlewares/auth.js";
import { CreateService, deleteService, getAllServices, getServiceById, getTopService, updateService, updateServiceStatus } from "../controller/service.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create",verifyToken,upload("salon-service").fields([
    {name:"service_image",maxCount: 1},
    {name:"service_icon",maxCount: 1},
    {name:"service_video_bg", maxCount: 1}
]) ,CreateService);

router.get("/getAll",getAllServices);
router.get("/getById/:id",getServiceById);


router.put("/updateStatus/:id",verifyToken,updateServiceStatus);

router.put("/update/:id",verifyToken,upload("salon-service").fields([
    {name:"service_image",maxCount: 1},
    {name:"service_icon",maxCount: 1},
    {name:"service_video_bg", maxCount: 1}
]),updateService);

router.delete("/delete/:id",verifyToken,deleteService);

router.get("/top-services",getTopService);

export default router;