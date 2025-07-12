import express from "express";
import {
  getFooter,
  createFooter,
  updateFooter,
  deleteFooter,
} from "../controllers/footerController.js";

const router = express.Router();

router.get("/", getFooter);
router.post("/", createFooter);
router.put("/:id", updateFooter);
router.delete("/:id", deleteFooter);

export default router;
