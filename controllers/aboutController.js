import About from "../database/models/about.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.find();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAbout = async (req, res) => {
  try {
    const { title, description, points } = req.body;
    const about = new About({ title, description, points });
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!about) return res.status(404).json({ error: "About not found" });
    res.json(about);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about) return res.status(404).json({ error: "About not found" });
    res.json({ message: "About deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
