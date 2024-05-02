import mongoose from "mongoose";
import { Retailer } from "../models/Retailer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const retailerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const retailer = await Retailer.findOne({ email });

        if (!retailer) {
            return res.status(404).json({ message: "Retailer not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            retailer.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                retailerId: retailer._id,
                retailerName: retailer.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        console.log("retailer logged in: ", retailer);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            message: "Retailer logged in",
            token: token,
            retailerName: retailer.name,
            retailerId: retailer._id,
        });
    } catch (error) {
        console.log("some error occured in retailer login", error);
    }
};

export default retailerLogin;
