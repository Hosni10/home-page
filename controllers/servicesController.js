import Services from "../database/models/services.js";
import { uploadToImageKit, deleteFromImageKit } from "../middleware/upload.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, cards } = req.body;

    // Process cards with uploaded images
    let processedCards = cards;
    if (req.files && req.files.length > 0) {
      processedCards = await Promise.all(
        cards.map(async (card, index) => {
          const cardImages = [];
          const cardImageFileIds = [];

          // Find images for this card
          const cardImagesFiles = req.files.filter((file) =>
            file.fieldname.startsWith(`cards[${index}][images]`)
          );

          for (const file of cardImagesFiles) {
            const imageData = await uploadToImageKit(file, "services");
            cardImages.push(imageData.url);
            cardImageFileIds.push(imageData.fileId);
          }

          return {
            ...card,
            images: cardImages,
            imageFileIds: cardImageFileIds,
          };
        })
      );
    }

    const service = new Services({ title, description, cards: processedCards });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { title, description, cards } = req.body;
    let processedCards = cards;

    // Get existing service to clean up old images
    const existingService = await Services.findById(req.params.id);

    if (req.files && req.files.length > 0) {
      // Clean up old images from ImageKit
      if (existingService && existingService.cards) {
        for (const card of existingService.cards) {
          if (card.imageFileIds) {
            for (const fileId of card.imageFileIds) {
              await deleteFromImageKit(fileId);
            }
          }
        }
      }

      // Process new images
      processedCards = await Promise.all(
        cards.map(async (card, index) => {
          const cardImages = [];
          const cardImageFileIds = [];

          // Find images for this card
          const cardImagesFiles = req.files.filter((file) =>
            file.fieldname.startsWith(`cards[${index}][images]`)
          );

          for (const file of cardImagesFiles) {
            const imageData = await uploadToImageKit(file, "services");
            cardImages.push(imageData.url);
            cardImageFileIds.push(imageData.fileId);
          }

          return {
            ...card,
            images: cardImages,
            imageFileIds: cardImageFileIds,
          };
        })
      );
    }

    const service = await Services.findByIdAndUpdate(
      req.params.id,
      { title, description, cards: processedCards },
      { new: true }
    );
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // Clean up images from ImageKit
    if (service.cards) {
      for (const card of service.cards) {
        if (card.imageFileIds) {
          for (const fileId of card.imageFileIds) {
            await deleteFromImageKit(fileId);
          }
        }
      }
    }

    await Services.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
