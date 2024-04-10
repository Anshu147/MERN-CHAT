
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();
app.use(express.json());  //to parse the including requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (rep, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
});
// app.get("/",(req,res)=>{
//         //root route http://localhost:5000/
//         res.send("Server is ready");
// });

server.listen(PORT, () => {
        connectToMongoDB();
        console.log(`Server is running on this port ${PORT}`);
});