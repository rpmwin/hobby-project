// import axios from "axios";
// import React, { useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Signup() {
//     const [user, setUser] = useState({});
//     const [buttonDisabled, setButtonDisabled] = useState(true);
//     const navigate = useNavigate();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUser({ ...user, [name]: value });
//     };

//     const isFormValid = () => {
//         return Object.values(user).every((value) => value !== "");
//     };

//     const registerUser = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await toast
//                 .promise(
//                     axios.post(
//                         "http://localhost:6565/api/v1/users/signup",
//                         user
//                     ),
//                     {
//                         pending: "Registering User",
//                         success: "User Registered Successfully",
//                         error: "Something went wrong in the register user",
//                     }
//                 )
//                 .then((response) => {
//                     setTimeout(() => {
//                         navigate("/farmer/login");
//                     }, 2000);
//                 });
//         } catch (error) {
//             console.log("something went wrong in the register user", error);
//         }
//     };

//     useState(() => {
//         setButtonDisabled(!isFormValid());
//     }, [user]);

//     return (
//         <div>
//             <h1> FARMER - SIGNUP</h1>

//             <form
//                 className="flex flex-col justify-center items-center"
//                 onSubmit={registerUser}
//             >
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="username"
//                     required
//                     className="input p-3 text-center rounded text-black m-3"
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="email"
//                     required
//                     className="input p-3 text-center rounded text-black m-3"
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="password"
//                     required
//                     className="input p-3 text-center rounded text-black m-3"
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="tel"
//                     name="phone"
//                     placeholder="phone number"
//                     className="input p-3 text-center rounded text-black m-3"
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="tel"
//                     name="landnumber"
//                     placeholder="land-number"
//                     className="input p-3 text-center rounded text-black m-3"
//                     onChange={handleInputChange}
//                 />
//                 <button
//                     className={`btn p-4 mt-4 bg-green-500 hover:bg-green-800 rounded duration-300 ${
//                         buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                     disabled={buttonDisabled}
//                 >
//                     Signup
//                 </button>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default Signup;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import farmerSignupBackground from "../assets/trialbg.jpg"; // Import the background image

function Signup() {
    const [user, setUser] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const isFormValid = () => {
        return Object.values(user).every((value) => value !== "");
    };

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const response = await toast
                .promise(
                    axios.post(
                        "http://localhost:6565/api/v1/users/signup",
                        user
                    ),
                    {
                        pending: "Registering User",
                        success: "User Registered Successfully",
                        error: "Something went wrong in the register user",
                    }
                )
                .then((response) => {
                    setTimeout(() => {
                        navigate("/farmer/login");
                    }, 2000);
                });
        } catch (error) {
            console.log("something went wrong in the register user", error);
        }
    };

    useState(() => {
        setButtonDisabled(!isFormValid());
    }, [user]);

    return (
        <div
            style={{
                backgroundImage: `url(${farmerSignupBackground})`,
                backgroundSize: "cover", // Set the background image to cover the container
                backgroundPosition: "center",
                width: "100%",
                height: "100vh",
                opacity: "0.5", // Set the opacity to 50%
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div>
                <h1 style={{color:"darkgreen",fontWeight:1000}}> FARMER - SIGNUP</h1>

                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={registerUser}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="username"
                        required
                        className="input p-3 text-center rounded text-black m-3"
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        required
                        className="input p-3 text-center rounded text-black m-3"
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        className="input p-3 text-center rounded text-black m-3"
                        onChange={handleInputChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="phone number"
                        className="input p-3 text-center rounded text-black m-3"
                        onChange={handleInputChange}
                    />
                    <input
                        type="tel"
                        name="landnumber"
                        placeholder="land-number"
                        className="input p-3 text-center rounded text-black m-3"
                        onChange={handleInputChange}
                    />
                    <button
                        className={`btn p-4 mt-4 bg-green-400 border-4 border-white hover:bg-green-800 rounded duration-300 text-black hover:text-white text- ${
                            buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={buttonDisabled}
                    >
                        Signup
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
