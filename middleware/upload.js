import multer from "multer";
import path from "path";
import imagekit, { destroyImage } from "../utilis/imagekitConfig.js";

// Memory storage for multer to handle file in memory before uploading to ImageKit
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Helper function to upload file to ImageKit
export const uploadToImageKit = async (file, folder = "uploads") => {
  try {
    const uploadResponse = await imagekit.upload({
      file: file.buffer,
      fileName: `${Date.now()}-${file.originalname}`,
      folder: folder,
    });

    return {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      name: uploadResponse.name,
    };
  } catch (error) {
    console.error("Error uploading to ImageKit:", error);
    throw new Error("Failed to upload image to ImageKit");
  }
};

// Helper function to delete file from ImageKit
export const deleteFromImageKit = async (fileId) => {
  try {
    await destroyImage(fileId);
  } catch (error) {
    console.error("Error deleting from ImageKit:", error);
  }
};

export default upload;
