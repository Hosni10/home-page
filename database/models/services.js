import mongoose from "mongoose";

const serviceCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  imageFileIds: { type: [String] },
});

const servicesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cards: [serviceCardSchema],
});

export default mongoose.model("Services", servicesSchema);
