import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newCrop, setNewCrop] = useState({
        cropName: "",
        plantingDate: "",
        harvestDate: "",
        estimatedYield: "",
    });

    const fetchUserData = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:6565/api/v1/users/get-user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const userData = response.data.farmer || response.data.retailer;

            const cropIds = userData.crops;
            const cropsData = await Promise.all(
                cropIds.map(async (cropId) => {
                    const cropResponse = await axios.get(
                        `http://localhost:6565/api/v1/users/get-crop/${cropId}`
                    );
                    return cropResponse.data;
                })
            );

            const userWithCrops = { ...userData, crops: cropsData };

            return userWithCrops;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    };

    const fetchAndUpdateUserData = async () => {
        try {
            setLoading(true);
            const userData = await fetchUserData();
            setUser(userData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
            toast.error("Failed to fetch user data");
        }
    };

    useEffect(() => {
        fetchAndUpdateUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCrop({
            ...newCrop,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem("token");
            await axios.post(
                `http://localhost:6565/api/v1/users/add-crop`,
                { ...newCrop, token }, // Send token along with the new crop data
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Crop added successfully");
            setNewCrop({
                cropName: "",
                plantingDate: "",
                harvestDate: "",
                estimatedYield: "",
            });
            fetchAndUpdateUserData(); // Fetch updated user data after adding a new crop
        } catch (error) {
            console.error("Error adding crop:", error);
            toast.error("Failed to add crop");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
            <h1 className="text-3xl font-semibold mb-6">Profile Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <div className="flex items-center mb-6">
                    <div className="bg-gray-800 p-6 rounded-lg mr-6 flex-shrink-0">
                        <div className="h-32 w-32 rounded-full overflow-hidden">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${user.name}.svg`}
                                alt="avatar"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg flex-grow">
                        <h2 className="text-xl font-semibold mb-4">
                            User Information
                        </h2>
                        <div>
                            <span className="font-semibold mr-2">Name:</span>
                            {user.name}
                        </div>
                        <div>
                            <span className="font-semibold mr-2">Email:</span>
                            {user.email}
                        </div>
                        <div>
                            <span className="font-semibold mr-2">Phone:</span>
                            {user.phone}
                        </div>
                        <div>
                            <span className="font-semibold mr-2">
                                Land Number:
                            </span>
                            {user.landnumber}
                        </div>
                    </div>
                </div>
            ) : (
                <p>User not found</p>
            )}
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Crop Details</h2>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Crop Name</th>
                            <th className="px-4 py-2">Planting Date</th>
                            <th className="px-4 py-2">Harvest Date</th>
                            <th className="px-4 py-2">Estimated Yield</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user &&
                            user.crops.map((crop, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        {crop.cropName}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {crop.plantingDate}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {crop.harvestDate}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {crop.estimatedYield}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg flex-grow">
                <h2 className="text-xl font-semibold mb-4">Add New Crop</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="cropName"
                            className="text-lg font-semibold mb-2"
                        >
                            Crop Name:
                        </label>
                        <input
                            type="text"
                            id="cropName"
                            name="cropName"
                            value={newCrop.cropName}
                            onChange={handleChange}
                            className="px-3 py-2 bg-gray-700 rounded-lg"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="plantingDate"
                            className="text-lg font-semibold mb-2"
                        >
                            Planting Date:
                        </label>
                        <input
                            type="date"
                            id="plantingDate"
                            name="plantingDate"
                            value={newCrop.plantingDate}
                            onChange={handleChange}
                            className="px-3 py-2 bg-gray-700 rounded-lg"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="harvestDate"
                            className="text-lg font-semibold mb-2"
                        >
                            Harvest Date:
                        </label>
                        <input
                            type="date"
                            id="harvestDate"
                            name="harvestDate"
                            value={newCrop.harvestDate}
                            onChange={handleChange}
                            className="px-3 py-2 bg-gray-700 rounded-lg"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="estimatedYield"
                            className="text-lg font-semibold mb-2"
                        >
                            Estimated Yield:
                        </label>
                        <input
                            type="number"
                            id="estimatedYield"
                            name="estimatedYield"
                            value={newCrop.estimatedYield}
                            onChange={handleChange}
                            className="px-3 py-2 bg-gray-700 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg"
                    >
                        Add Crop
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
