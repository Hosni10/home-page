import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: [String] },
  imageFileId: { type: [String] },
  date: { type: Date, required: true },
});

export default mongoose.model("Blog", blogSchema);
