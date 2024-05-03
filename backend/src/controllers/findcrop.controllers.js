import Crop from "../models/Crop.models.js";

export const findCrop = async (req, res) => {
    try {
        const cropId = req.params.id;
        const crop = await Crop.findById(cropId); // Assuming you're using Mongoose and the Crop model has a method to find by ID
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        // If crop found, send it as response
        res.json(crop);
    } catch (error) {
        console.error('Error fetching crop:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

