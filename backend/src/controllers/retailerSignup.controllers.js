import { Retailer } from "../models/Retailer.model.js";
import bcrypt from "bcrypt";

const retailerSignup = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const retailerExists = await Retailer.findOne({ email });

        if (retailerExists) {
            return res.status(400).json({ message: "Retailer already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const retailer = await Retailer.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
        });

        const data = await retailer.save();

        console.log("retailer created: ", retailer);

        return res
            .status(201)
            .json({ message: "Retailer created successfully", data: data });
    } catch (error) {
        console.log(" some error occured in retailer signup", error);
    }
};


export default retailerSignup