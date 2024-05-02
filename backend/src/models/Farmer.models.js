import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    landnumber: String,
    crops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop",
        },
    ],
});

const Farmer = mongoose.model("User", FarmerSchema);

export default Farmer;
