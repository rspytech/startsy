import express from "express";
import http from "http";
import { configureSocketIO } from "./socket/socketIo.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import authRoute from "./routes/auth.routes.js";
import investorRoute from "./routes/investor.routes.js";
import founderRoute from "./routes/founder.routes.js";
import communityMemberRoute from "./routes/communityMember.routes.js";
import postRoute from "./routes/post.routes.js";
import chatRoute from "./routes/chat.routes.js";
import googleAuthRoute from "./routes/google.auth.routes.js";
import connectionsRoute from "./routes/connection.routes.js";
import adminRoute from "./routes/admin.routes.js";
import notificationRoute from "./routes/notifications.routes.js";
import groupChatRoute from "./routes/groupChat.routes.js";
import healthRoute from "./routes/health.routes.js"
import reportRoute from './routes/report.routes.js';
import TestRoute from "./routes/test.route.js";

const app = express();
const server = http.createServer(app); // Create the HTTP server
configureSocketIO(server); // Configure Socket.IO with the server

// Middleware
app.use(cors({
    origin: "*", // Adjust origin for production
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/" , (req,res)=>{
    res.send("Hello, World!");
})
app.use(cookieSession({
    name: "session",
    keys: ["s5Lcz9k9mRkA5O5xT7n9R8l2sE6QvB8y"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

// Routes
app.use("/api", authRoute);
app.use("/investor", investorRoute);
app.use("/founder", founderRoute);
app.use("/communityMember", communityMemberRoute);
app.use("/posts", postRoute);
app.use("/chats", chatRoute);
app.use("/auth", googleAuthRoute);
app.use("/connections", connectionsRoute);
app.use("/admin", adminRoute);
app.use("/notification", notificationRoute);
app.use("/groupChat", groupChatRoute);
app.use("/health", healthRoute);
app.use("/report", reportRoute);
app.use("/test", TestRoute);

export default server; // Export the server instead of starting it here
