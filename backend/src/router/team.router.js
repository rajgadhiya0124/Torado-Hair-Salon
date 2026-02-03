import express from "express"
import verifyToken from "../middlewares/auth.js";
import { createTeam, deleteTeam, getAllTeam, getTeamById, updateTeam } from "../controller/team.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create",verifyToken,upload("team").single("person_image"),createTeam);
router.get("/getAll",getAllTeam);
router.get("/getById/:id",getTeamById);

router.put("/update/:id",verifyToken,upload("team").single("person_image"),updateTeam);
router.delete("/delete/:id",verifyToken,deleteTeam);

export default router;