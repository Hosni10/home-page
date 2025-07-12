import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  link: { type: String, required: true },
});

const footerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  socials: [socialSchema],
});

export default mongoose.model("Footer", footerSchema);
