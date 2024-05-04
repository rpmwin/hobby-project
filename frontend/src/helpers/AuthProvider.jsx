import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const [retailer, setIsRetailer] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/user");
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const userInfo = (user) => {
        setUser(user);
    };
    const isReatailer = () => {
        setIsRetailer(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                fetchUserData,
                userInfo,
                user,
                isReatailer,
                retailer,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
