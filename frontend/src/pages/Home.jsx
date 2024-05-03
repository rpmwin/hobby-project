import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
    return (
        <div>
            hey welcome to my home page THIS IS MY farmers connect APP!!
            <div className="mt-14">
                <NavLink
                    to={"/retailer"}
                    className="px-9 py-5 m-3 duration-300 uppercase bg-slate-600 w-max hover:bg-orange-700 rounded-lg"
                >
                    retailer
                </NavLink>
                <NavLink
                    to={"/farmer"}
                    className="px-9 py-5 m-3 duration-300 uppercase bg-slate-600 w-max hover:bg-orange-700 rounded-lg"
                >
                    farmer
                </NavLink>
            </div>
        </div>
    );
}

export default Home;
