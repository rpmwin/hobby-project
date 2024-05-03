import React, { useState, useEffect } from "react";
import axios from "axios";

const AllCrops = () => {
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

    // Function to group crops by farmer
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

    // Function to group crops by crop name
    const groupCropsByCropName = (crops) => {
        const groupedCrops = {};
        crops.forEach((crop) => {
            if (!groupedCrops[crop.cropName]) {
                groupedCrops[crop.cropName] = [];
            }
            groupedCrops[crop.cropName].push(crop);
        });
        return groupedCrops;
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
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Table for crops grouped by crop name */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Crops Grouped by Crop Name
                        </h2>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Crop Name</th>
                                    <th className="px-4 py-2">Farmer NAME</th>
                                    <th className="px-4 py-2">Planting Date</th>
                                    <th className="px-4 py-2">Harvest Date</th>
                                    <th className="px-4 py-2">
                                        Estimated Yield
                                    </th>
                                    <th className="px-4 py-2">
                                        phone - number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(
                                    groupCropsByCropName(allCrops)
                                ).map(([cropName, crops]) =>
                                    crops.map((crop) => (
                                        <tr key={crop._id}>
                                            <td className="border px-4 py-2">
                                                {cropName}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {crop.farmerName}
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
                                                {crop.farmerNumber}
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
