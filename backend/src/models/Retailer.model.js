import mongoose from "mongoose";

const retailerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    crops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop",
        },
    ],
});

export const Retailer = mongoose.model("Retailer", retailerSchema);
