import mongoose from "mongoose";
import server from "./app.js"; // Import the server from app.js
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
    const PORT = process.env.PORT || 5000; // Use PORT from environment or fallback to 5000
    server.listen(PORT, "0.0.0.0", () => {
        console.log(`Server started on port ${PORT}`);
    });
};

// Connect to MongoDB and start the server
mongoose
    .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(() => {
        console.log("Database connection successful");
        startServer();
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
