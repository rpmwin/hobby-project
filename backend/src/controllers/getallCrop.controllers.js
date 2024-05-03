import Crop from "../models/Crop.models.js";



// Controller to fetch all crops
const getAllCrops = async (req, res) => {
    try {
        // Fetch all crops from the database
        const allCrops = await Crop.find();

        // Send the crops as a response
        res.status(200).json(allCrops);
    } catch (error) {
        console.error("Error fetching all crops:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default getAllCrops;
