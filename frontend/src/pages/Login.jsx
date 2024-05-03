// import axios from "axios";
// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../helpers/AuthProvider";

// function Login() {
//     const [user, setUser] = useState({});
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const loginUser = async (e) => {
//         try {
//             await toast
//                 .promise(loginRequest(), {
//                     pending: "Logging In User",
//                     success: "User Logged In Successfully",
//                     error: "Something went wrong in the logging user",
//                 })
//                 .then((response) => {
//                     setTimeout(() => {
//                         navigate("/profile");
//                     }, 2000);
//                 });
//         } catch (error) {
//             console.log("something went wrong in the logging user", error);
//         }
//     };

//     const loginRequest = async () => {
//         try {
//             const response = await axios.post(
//                 "http://localhost:6565/api/v1/users/login",
//                 user
//             );

//             const token = response.data.token;
//             console.log("token: ", token);
//             console.log("response", response);
//             console.log("response.data: ", response.data);
//             console.log("response.data.token: ", response.data.token);
//             localStorage.setItem("token", token); // Store in local storage
//             sessionStorage.setItem("token", token);

//             // Set token in headers for subsequent requests
//             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//             login();
//         } catch (error) {
//             throw error;
//         }
//     };

//     return (
//         <div>
//             <h1> FARMER - LOGIN</h1>

//             <form
//                 className="flex flex-col justify-center items-center"
//                 onSubmit={(e) => {
//                     e.preventDefault(), loginUser(e);
//                 }}
//             >
//                 <input
//                     type="email"
//                     placeholder="email"
//                     required
//                     className="input p-3 text-center rounded text-black m-3"
//                     onChange={(e) =>
//                         setUser({ ...user, email: e.target.value })
//                     }
//                 />
//                 <input
//                     type="password"
//                     placeholder="password"
//                     required
//                     className="input p-3 text-center rounded text-black m-3"
//                     onChange={(e) =>
//                         setUser({ ...user, password: e.target.value })
//                     }
//                 />
//                 <button className="btn p-4 bg-green-500  rounded hover:bg-green-800 duration-300">
//                     login
//                 </button>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default Login;
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helpers/AuthProvider";
import backgroundImage from "../assets/bgFarmerLogin.jpg"; // Import the background image
import gil from "../assets/gilroy.otf"; // Import the Gilroy font file

function Login() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const loginUser = async (e) => {
        try {
            await toast
                .promise(loginRequest(), {
                    pending: "Logging In User",
                    success: "User Logged In Successfully",
                    error: "Something went wrong in the logging user",
                })
                .then((response) => {
                    setTimeout(() => {
                        navigate("/profile");
                    }, 2000);
                });
        } catch (error) {
            console.log("something went wrong in the logging user", error);
        }
    };

    const loginRequest = async () => {
        try {
            const response = await axios.post(
                "http://localhost:6565/api/v1/users/login",
                user
            );

            const token = response.data.token;
            console.log("token: ", token);
            console.log("response", response);
            console.log("response.data: ", response.data);
            console.log("response.data.token: ", response.data.token);
            localStorage.setItem("token", token); // Store in local storage
            sessionStorage.setItem("token", token);

            // Set token in headers for subsequent requests
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            login();
        } catch (error) {
            throw error;
        }
    };

    return (
        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

            <style>
                {`
                    @font-face {
                        font-family: 'Gilroy';
                        src: url(${gil}) format('woff2');
                        font-weight: normal;
                        font-style: normal;
                    }
                `}
            </style>

            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                <h1 style={{ fontFamily: "Gilroy, sans-serif", textAlign: "center", fontSize: "30px", marginBottom: "20px", color: "green", userSelect: "none" }}> FARMER - LOGIN</h1>

                <div className="flex flex-col items-center">
                    <form
                        className="flex flex-col justify-center items-center"
                        onSubmit={(e) => {
                            e.preventDefault(), loginUser(e);
                        }}
                    >
                        <input
                            type="email"
                            placeholder="email"
                            required
                            className="input p-3 text-center rounded text-black m-3"
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                        <input
                            type="password"
                            placeholder="password"
                            required
                            className="input p-3 text-center rounded text-black m-3"
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                       <button
    className="btn p-1 rounded border-2 bg-transparent text-black border-black hover:border-black hover:bg-green-800 hover:text-white duration-700 w-60"
   
>
    Login
    </button>

                            
                        
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
