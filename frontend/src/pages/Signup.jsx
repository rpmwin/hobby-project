import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FARMERsignup from "../assets/FARMERsignup.jpg";

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
        <div className="w-screen h-screen flex justify-center items-center flex-col" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${FARMERsignup})`}}>
            <h1> FARMER - SIGNUP</h1>

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
                    className={`btn p-4 mt-4 bg-green-500 hover:bg-green-800 rounded duration-300 ${
                        buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={buttonDisabled}
                >
                    Signup
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
