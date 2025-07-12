import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: {
    type: [String],
    validate: [(arr) => arr.length === 4, "Exactly 4 points required"],
    required: true,
  },
});

export default mongoose.model("About", aboutSchema);
