import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../helpers/AuthProvider";
import { io } from "socket.io-client";
const groupCropsByFarmer = (crops) => {
    const groupedCrops = {};
    crops.forEach((crop) => {
        if (!groupedCrops[crop.farmerId]) {
            groupedCrops[crop.farmerId] = [];
        }
        groupedCrops[crop.farmerId].push(crop);
    });
    return groupedCrops;
};

const AllCrops = () => {
    const { user } = useAuth();
    const socket = useMemo(() => io("http://localhost:6565"), []);
    const [allCrops, setAllCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllCrops = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:6565/api/v1/users/all-crops"
                );
                setAllCrops(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching all crops:", error);
                setLoading(false);
            }
        };

        fetchAllCrops();
    }, []);

    useEffect(() => {
        // socket.emit("username", user.name);
        console.log("user: ", user);

        socket.emit("username", user.name);

        return () => {
            socket.disconnect(); // Disconnect the socket when component unmounts
        };
    }, []);

    // Function to initiate chat with a user
    const startChat = (username) => {
        // Emit a socket event to the server indicating that the current user wants to chat with the selected user
        // You can send the username or any unique identifier to identify the recipient
        // For simplicity, let's assume you have a socket connection stored in a variable named `socket`
        // Modify this according to how you handle socket connections in your application
        socket.emit("startChat", username);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col gap-8 justify-center items-center">
            <h1 className="text-3xl font-semibold mb-6 mt-16">All Crops</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col gap-8 items-center justify-center">
                    {/* Table for crops grouped by farmer */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Crops Grouped by Farmer
                        </h2>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Farmer ID</th>
                                    <th className="px-4 py-2">Crop Name</th>
                                    <th className="px-4 py-2">Planting Date</th>
                                    <th className="px-4 py-2">Harvest Date</th>
                                    <th className="px-4 py-2">
                                        Estimated Yield
                                    </th>
                                    <th className="px-4 py-2">Actions</th>{" "}
                                    {/* Add Actions column */}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(
                                    groupCropsByFarmer(allCrops)
                                ).map(([farmerId, crops]) =>
                                    crops.map((crop) => (
                                        <tr key={crop._id}>
                                            <td className="border px-4 py-2">
                                                {crop.farmerName}
                                            </td>
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
                                            <td className="border px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        startChat(
                                                            crop.farmerName
                                                        )
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Start Chat
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllCrops;
