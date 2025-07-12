import express from "express";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectsController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProjects);
router.post("/", upload.array("image", 10), createProject);
router.put("/:id", upload.array("image", 10), updateProject);
router.delete("/:id", deleteProject);

export default router;
