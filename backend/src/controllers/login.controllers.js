import bcrypt from "bcrypt";
import Farmer from "../models/Farmer.models.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
        return res.status(404).json({ message: "Farmer not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, farmer.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
            farmerId: farmer._id,
            farmerName: farmer.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
    });

    console.log("farmer logged in: ", farmer);

    res.status(200).json({
        message: "Login successful",
        farmerId: farmer._id,
        farmerName: farmer.name,
        token: token,
    });
    } catch (error) {
        console.log(" some error occured in login",error);
    }
};
