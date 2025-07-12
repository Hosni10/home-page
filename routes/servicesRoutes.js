import express from "express";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/servicesController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllServices);
router.post("/", upload.any(), createService);
router.put("/:id", upload.any(), updateService);
router.delete("/:id", deleteService);

export default router;
