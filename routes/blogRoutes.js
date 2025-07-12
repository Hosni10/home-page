import express from "express";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", upload.array("image", 10), createBlog);
router.put("/:id", upload.array("image", 10), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
