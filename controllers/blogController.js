import Blog from "../database/models/blog.js";
import { uploadToImageKit, deleteFromImageKit } from "../middleware/upload.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    let imageUrls = [];
    let imageFileIds = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageData = await uploadToImageKit(file, "blogs");
        imageUrls.push(imageData.url);
        imageFileIds.push(imageData.fileId);
      }
    }

    const blog = new Blog({
      title,
      description,
      image: imageUrls.length > 0 ? imageUrls : req.body.image || [],
      imageFileId: imageFileIds,
      date,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      // Delete old images from ImageKit if they exist
      const existingBlog = await Blog.findById(req.params.id);
      if (
        existingBlog &&
        existingBlog.imageFileId &&
        existingBlog.imageFileId.length > 0
      ) {
        for (const fileId of existingBlog.imageFileId) {
          await deleteFromImageKit(fileId);
        }
      }

      // Upload new images to ImageKit
      const imageUrls = [];
      const imageFileIds = [];
      for (const file of req.files) {
        const imageData = await uploadToImageKit(file, "blogs");
        imageUrls.push(imageData.url);
        imageFileIds.push(imageData.fileId);
      }

      updateData.image = imageUrls;
      updateData.imageFileId = imageFileIds;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Delete images from ImageKit if they exist
    if (blog.imageFileId && blog.imageFileId.length > 0) {
      for (const fileId of blog.imageFileId) {
        await deleteFromImageKit(fileId);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
