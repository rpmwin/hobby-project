// middleware/auth.js

import jwt from "jsonwebtoken";
import { default as decodeToken } from "../helpers/decodeToken.js";

export default function (req, res, next) {
    // Verify token
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res
                .status(401)
                .json({ msg: "No token, authorization denied" });
        }
        const decoded = decodeToken(token);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
