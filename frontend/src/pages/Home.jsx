import React from "react";
import { NavLink } from "react-router-dom";
import backgroundImage from "../assets/bg.jpg"; // Import the background image
import AnuratiRegular from "../assets/Anurati-Regular.otf"; // Import the Anurati-Regular font file
import gil from "../assets/gilroy.otf"; // Import the Gilroy font file

function Home() {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <style>
                {`
                    @font-face {
                        font-family: 'Anurati';
                        src: url(${AnuratiRegular}) format('woff2');
                        font-weight: normal;
                        font-style: normal;
                    }

                    @font-face {
                        font-family: 'Gilroy';
                        src: url(${gil}) format('woff2');
                        font-weight: normal;
                        font-style: normal;
                    }

                    .glass-morphic-button {
                        background-color: rgba(255, 255, 255, 0.1);
                        border: none;
                        border-radius: 8px;
                        padding: 12px 24px;
                        font-family: 'Gilroy', sans-serif;
                        font-size: 16px;
                        color: #fff;
                        cursor: pointer;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out; /* Added color transition */
                        margin: 0 10px; /* Adjust the margin for spacing */
                        user-select: none; /* Prevent text selection */
                    }

                    .glass-morphic-button:hover {
                        background-color: #7CFFB2; /* Light green color */
                        color: red; /* Red font color */
                    }
                `}
            </style>
            <div
                style={{
                    fontFamily: "Gilroy, sans-serif",
                    textAlign: "center",
                    fontSize: "24px",
                    marginBottom: "20px",
                    color: "#fff",
                    userSelect: "none",
                }}
            >
                WELCOME TO
            </div>
            <div
                style={{
                    fontFamily: "Anurati, sans-serif",
                    textAlign: "center",
                    fontSize: "40px",
                    marginBottom: "50px",
                    color: "#fff",
                    userSelect: "none",
                }}
            >
                F A R M F U S E
            </div>
            <div>
                <div className="mt-14 ">
                    <NavLink
                        to={"/retailer"}
                        className="glass-morphic-button duration-300 uppercase w-max rounded-lg"
                    >
                        retailer
                    </NavLink>
                    <NavLink
                        to={"/farmer"}
                        className="glass-morphic-button duration-300 uppercase w-max rounded-lg"
                    >
                        farmer
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Home;
