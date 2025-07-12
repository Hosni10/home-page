import Footer from "../database/models/footer.js";

export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.find();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createFooter = async (req, res) => {
  try {
    const { title, description, socials } = req.body;
    const footer = new Footer({ title, description, socials });
    await footer.save();
    res.status(201).json(footer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!footer) return res.status(404).json({ error: "Footer not found" });
    res.json(footer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);
    if (!footer) return res.status(404).json({ error: "Footer not found" });
    res.json({ message: "Footer deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
