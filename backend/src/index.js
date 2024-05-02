import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "./db/dbconnect.js";
import http from "http";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

await connectDB()
    .then(() => {
        console.log("db connected");
        const server = http.createServer(app);
        const io = new Server(server, {
            cors: {
                origin: "*",
                credentials: true,
            },
        });
        const usersMap = new Map();

        io.on("connection", (socket) => {
            console.log("a new user connected", socket.id);

            socket.on("username", (username) => {
                usersMap.set(username, socket.id);
                console.log(
                    username,
                    " connected to server with socket id ",
                    socket.id
                );
            });

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);

                usersMap.forEach((value, key) => {
                    if (value === socket.id) {
                        usersMap.delete(key);
                    }
                });
            });
        });
    })
    .catch((error) => {
        console.log("something went wrong in the db", error);
        process.exit(1);
    });

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});

app.use("/api/v1/users", router);
