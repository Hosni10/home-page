import express from "express";
import {
  getAllHeaders,
  createHeader,
  updateHeader,
  deleteHeader,
} from "../controllers/headerController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllHeaders);
router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 10 },
    { name: "image2", maxCount: 10 },
  ]),
  createHeader
);
router.put(
  "/:id",
  upload.fields([
    { name: "image1", maxCount: 10 },
    { name: "image2", maxCount: 10 },
  ]),
  updateHeader
);
router.delete("/:id", deleteHeader);

export default router;
