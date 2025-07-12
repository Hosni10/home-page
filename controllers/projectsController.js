import Project from "../database/models/project.js";
import { uploadToImageKit, deleteFromImageKit } from "../middleware/upload.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrls = [];
    let imageFileIds = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageData = await uploadToImageKit(file, "projects");
        imageUrls.push(imageData.url);
        imageFileIds.push(imageData.fileId);
      }
    }

    const project = new Project({
      title,
      description,
      image: imageUrls.length > 0 ? imageUrls : req.body.image || [],
      imageFileId: imageFileIds,
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      // Delete old images from ImageKit if they exist
      const existingProject = await Project.findById(req.params.id);
      if (
        existingProject &&
        existingProject.imageFileId &&
        existingProject.imageFileId.length > 0
      ) {
        for (const fileId of existingProject.imageFileId) {
          await deleteFromImageKit(fileId);
        }
      }

      // Upload new images to ImageKit
      const imageUrls = [];
      const imageFileIds = [];
      for (const file of req.files) {
        const imageData = await uploadToImageKit(file, "projects");
        imageUrls.push(imageData.url);
        imageFileIds.push(imageData.fileId);
      }

      updateData.image = imageUrls;
      updateData.imageFileId = imageFileIds;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Delete images from ImageKit if they exist
    if (project.imageFileId && project.imageFileId.length > 0) {
      for (const fileId of project.imageFileId) {
        await deleteFromImageKit(fileId);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
