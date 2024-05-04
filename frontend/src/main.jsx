import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import {
    Routes,
    Route,
    RouterProvider,
    createBrowserRouter,
    Outlet,
    createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/Home.jsx";
import RetailerLogin from "./pages/RetailerLogin.jsx";
import RetailerSignup from "./pages/RetailerSignup.jsx";
import Profile from "./pages/Profile.jsx";
import { AuthProvider } from "./helpers/AuthProvider.jsx";
import ProtectedRoute from "./helpers/ProtectedRoute.jsx";
import AllCrops from "./pages/AllCrops.jsx";
import MiddleOutlet from "./pages/MiddleOutlet.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/*" element={<App />}>
            <Route index element={<Home />} />
            <Route
                path="retailer/*"
                element={
                    <>
                        <MiddleOutlet />
                    </>
                }
            >
                <Route path="login" element={<RetailerLogin />} />
                <Route path="signup" element={<RetailerSignup />} />
            </Route>
            <Route
                path="farmer/*"
                element={
                    <>
                        <MiddleOutlet />
                    </>
                }
            >
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>
            <Route
                path="profile/*"
                element={
                    <>
                        <Outlet />
                        <ProtectedRoute element={Profile} />
                    </>
                }
            />
            <Route path="allcrops/*" element={<AllCrops />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
