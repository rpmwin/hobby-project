import React from "react";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="w-[120vw] min-h-screen h-[120vh] sm:h-screen sm:w-screen bg-slate-900 text-3xl flex justify-center items-center text-white flex-col relative overflow-x-hidden ">
            <div className="  text-center w-screen min-h-screen overflow-x-hidden flex justify-center items-center flex-col">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
