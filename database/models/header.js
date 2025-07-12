import mongoose from "mongoose";

const headerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image1: { type: [String] },
  image1FileId: { type: [String] },
  image2: { type: [String] },
  image2FileId: { type: [String] },
});

export default mongoose.model("Header", headerSchema);
