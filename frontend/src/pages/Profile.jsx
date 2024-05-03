import React from "react";
import { useAuth } from "../helpers/AuthProvider";

const Profile = () => {
    const { logout } = useAuth();

    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    );
};

export default Profile;
