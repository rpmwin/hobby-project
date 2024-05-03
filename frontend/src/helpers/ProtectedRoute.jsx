import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Element /> : <Navigate to="/" />;
};

export default ProtectedRoute;
