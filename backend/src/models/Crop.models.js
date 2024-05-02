import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    cropName: String,
    plantingDate: String,
    harvestDate: String,
    estimatedYield: Number,
});

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;
