import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createTerms, deleteTerms, getTerms, updateTerms } from "../controller/terms.controller.js";
import { uploadNone } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create",verifyToken,uploadNone.none(),createTerms);
router.get("/get",getTerms);
router.put("/update/:id",verifyToken,uploadNone.none(),updateTerms);
router.delete("/delete/:id",verifyToken,deleteTerms);

export default router;