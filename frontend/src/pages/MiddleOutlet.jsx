import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MiddleOutlet() {
    return (
        <div className="relative">
            <div className="absolute   right-[50%] translate-x-[50%]">
                <Navbar />
            </div>
            <div className="w-screen min-h-screen flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
}

export default MiddleOutlet;
