import Header from "../database/models/header.js";
import { uploadToImageKit, deleteFromImageKit } from "../middleware/upload.js";

export const getAllHeaders = async (req, res) => {
  try {
    const headers = await Header.find();
    res.json(headers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHeader = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image1Urls = [];
    let image1FileIds = [];
    let image2Urls = [];
    let image2FileIds = [];

    if (req.files && req.files.image1 && req.files.image1.length > 0) {
      for (const file of req.files.image1) {
        const imageData = await uploadToImageKit(file, "headers");
        image1Urls.push(imageData.url);
        image1FileIds.push(imageData.fileId);
      }
    }
    if (req.files && req.files.image2 && req.files.image2.length > 0) {
      for (const file of req.files.image2) {
        const imageData = await uploadToImageKit(file, "headers");
        image2Urls.push(imageData.url);
        image2FileIds.push(imageData.fileId);
      }
    }

    const header = new Header({
      title,
      description,
      image1: image1Urls.length > 0 ? image1Urls : req.body.image1 || [],
      image1FileId: image1FileIds,
      image2: image2Urls.length > 0 ? image2Urls : req.body.image2 || [],
      image2FileId: image2FileIds,
    });
    await header.save();
    res.status(201).json(header);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateHeader = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Handle image1 uploads
    if (req.files && req.files.image1 && req.files.image1.length > 0) {
      // Delete old image1 from ImageKit if they exist
      const existingHeader = await Header.findById(req.params.id);
      if (
        existingHeader &&
        existingHeader.image1FileId &&
        existingHeader.image1FileId.length > 0
      ) {
        for (const fileId of existingHeader.image1FileId) {
          await deleteFromImageKit(fileId);
        }
      }

      // Upload new image1 to ImageKit
      const image1Urls = [];
      const image1FileIds = [];
      for (const file of req.files.image1) {
        const imageData = await uploadToImageKit(file, "headers");
        image1Urls.push(imageData.url);
        image1FileIds.push(imageData.fileId);
      }
      updateData.image1 = image1Urls;
      updateData.image1FileId = image1FileIds;
    }

    // Handle image2 uploads
    if (req.files && req.files.image2 && req.files.image2.length > 0) {
      // Delete old image2 from ImageKit if they exist
      const existingHeader = await Header.findById(req.params.id);
      if (
        existingHeader &&
        existingHeader.image2FileId &&
        existingHeader.image2FileId.length > 0
      ) {
        for (const fileId of existingHeader.image2FileId) {
          await deleteFromImageKit(fileId);
        }
      }

      // Upload new image2 to ImageKit
      const image2Urls = [];
      const image2FileIds = [];
      for (const file of req.files.image2) {
        const imageData = await uploadToImageKit(file, "headers");
        image2Urls.push(imageData.url);
        image2FileIds.push(imageData.fileId);
      }
      updateData.image2 = image2Urls;
      updateData.image2FileId = image2FileIds;
    }

    const header = await Header.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!header) return res.status(404).json({ error: "Header not found" });
    res.json(header);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteHeader = async (req, res) => {
  try {
    const header = await Header.findById(req.params.id);
    if (!header) return res.status(404).json({ error: "Header not found" });

    // Delete images from ImageKit if they exist
    if (header.image1FileId && header.image1FileId.length > 0) {
      for (const fileId of header.image1FileId) {
        await deleteFromImageKit(fileId);
      }
    }
    if (header.image2FileId && header.image2FileId.length > 0) {
      for (const fileId of header.image2FileId) {
        await deleteFromImageKit(fileId);
      }
    }

    await Header.findByIdAndDelete(req.params.id);
    res.json({ message: "Header deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
