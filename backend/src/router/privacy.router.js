import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createPrivacy, deletePrivacy, GetPrivcy, updatePrivacy } from "../controller/privacy.controller.js";
import { uploadNone } from "../middlewares/multer.js";
const router = express.Router();

router.post("/create",verifyToken,uploadNone.none() ,createPrivacy);
router.get("/get",GetPrivcy);
router.put("/update/:id",verifyToken,uploadNone.none(),updatePrivacy);
router.delete("/delete/:id",verifyToken,deletePrivacy);

export default router;