import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    cropName: String,
    plantingDate: String,
    harvestDate: String,
    estimatedYield: Number,
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    farmerName: String,
    farmerNumber: String,
});

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;
