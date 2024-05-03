import { Retailer } from "../models/Retailer.model.js";
import Farmer from "../models/Farmer.models.js";
import decodeToken from "../helpers/decodeToken.js";

export const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res
                .status(400)
                .json({ message: "Authorization header is missing" });
        }

        const { farmerId, farmerName, retailerId, retailerName } =
            await decodeToken(token);

        if (!farmerId && !farmerName && !retailerId && !retailerName) {
            return res.status(400).json({ message: "Invalid token" });
        }

        if (farmerId) {
            const farmer = await Farmer.findById(farmerId).select("-password");
            console.log(farmer);
            return res.status(200).json({ farmer });
        } else if (retailerId) {
            const retailer = await Retailer.findById(retailerId);
            console.log(retailer);
            return res.status(200).json({ retailer });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
