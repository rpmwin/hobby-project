import decodeToken from "../helpers/decodeToken.js";
import Crop from "../models/Crop.models.js";
import Farmer from "../models/Farmer.models.js";

const addCrop = async (req, res) => {
    try {
        const { cropName, plantingDate, harvestDate, estimatedYield } =
            req.body;

        // Assuming token is sent in the request headers
        const token = req.headers.authorization.split(" ")[1];

        if (
            !cropName ||
            !plantingDate ||
            !harvestDate ||
            !estimatedYield ||
            !token
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const { farmerId, farmerName } = await decodeToken(token);

        if (!farmerId || !farmerName) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const farmer = await Farmer.findById(farmerId);

        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }

        const crop = await Crop.create({
            cropName,
            plantingDate,
            harvestDate,
            estimatedYield,
            farmerId: farmer._id,
            farmerName: farmer.name,
            farmerNumber: farmer.phone,
        });

        farmer.crops.push(crop);

        await farmer.save();

        return res
            .status(200)
            .json({ message: "Crop added successfully", crop });
    } catch (error) {
        console.error("Error adding crop:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default addCrop;
