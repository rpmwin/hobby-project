import mongoose from "mongoose";
import Farmer from "../models/Farmer.models.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, landnumber } = req.body;

        if (!name || !email || !password || !phone || !landnumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const farmerExists = await Farmer.findOne({ email });

        if (farmerExists) {
            return res.status(400).json({ message: "Farmer already exists" });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const farmer = await Farmer.create({
            name,
            email,
            password: hashedPassword,
            phone,
            landnumber,
        });

        const data = await farmer.save()

        console.log("farmer created: ", farmer);

        return res.status(200).json({
            _id: farmer._id,
            name: farmer.name,
            email: farmer.email,
            phone: farmer.phone,
            landnumber: farmer.landnumber,
            crops: farmer.crops
        })


    } catch (error) {
        console.log("some error occured in signup controller: ", error);
    }
};


export default signup