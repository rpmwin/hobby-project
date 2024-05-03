// import React from "react";
// import { NavLink } from "react-router-dom";

// function Navbar() {
//     return (
//         <div className="flex justify-center items-center">
//             <NavLink
//                 to="login"
//                 className={({ isActive }) =>
//                     `text-3xl px-10 p-4 bg-slate-500 m-3 rounded-lg hover:bg-slate-600 ${
//                         isActive ? "bg-orange-600" : ""
//                     }`
//                 }
//             >
//                 Login
//             </NavLink>
//             <NavLink
//                 to="signup"
//                 className={({ isActive }) =>
//                     `text-3xl px-10 p-4 bg-slate-500 m-3 rounded-lg hover:bg-slate-600 ${
//                         isActive ? "bg-orange-600" : ""
//                     }`
//                 }
//             >
//                 Signup
//             </NavLink>
            
//         </div>
//     );
// }

// export default Navbar;


import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <div className="absolute top-0 right-0 flex justify-center items-center">
            <NavLink
                to="login"
                className={({ isActive }) =>
                    `text-3xl px-10 p-2 bg-transparent border m-3 rounded-lg hover:bg-slate-600 duration-700 ${
                        isActive ? "bg-orange-600" : ""
                    }`
                }
            >
                Login
            </NavLink>
            <NavLink
                to="signup"
                className={({ isActive }) =>
                    `text-3xl px-10 p-2 bg-transparent border m-3 rounded-lg hover:bg-slate-600 duration-700 ${
                        isActive ? "bg-orange-600" : ""
                    }`
                }
            >
                Signup
            </NavLink>
        </div>
    );
}

export default Navbar;
