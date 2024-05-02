import decodeToken from "../helpers/decodeToken.js";
import Crop from "../models/Crop.models.js";
import Farmer from "../models/Farmer.models.js";

const addCrop = async (req, res) => {
    try {
        const { cropName, plantingDate, harvestDate, estimatedYield, token } =
            req.body;

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

        console.log(farmer);

        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }

        const crop = await Crop.create({
            cropName,
            plantingDate,
            harvestDate,
            estimatedYield,
        });

        farmer.crops.push(crop);

        await farmer.save();

        console.log("crop added: ", crop);

        console.log("farmer updated: ", farmer);

        return res.status(200).json({ crop });
    } catch (error) {
        console.log(" some error occured in adding crop", error);
    }
};

export default addCrop;
