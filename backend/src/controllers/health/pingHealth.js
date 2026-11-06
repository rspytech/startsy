// export const pingHealth = async(req, res) => {
//     res.status(200).json({
//         message: "Server is up and running",
//     });
// }

// import axios from "axios"
// import cron from "node-cron";
// const PING_URL = "https://startsy.onrender.com";

// export const pingHealth = async (req, res) => {
//     try {
//         console.log("Server health check initiated");
//         res.status(200).json({ message: "Server is healthy" });
//     }
//     catch (error) {
//         console.error("Health check failed:", error);
//         res.status(500).json({ message: "Health check failed" });
//     }
// };

// const pingCheck = async () => {
//     try {
//         console.log("Sending ping request to the server...");
//         await axios.get(`${PING_URL}/health/pingHealth`); // Sending GET request to health endpoint
//         console.log(`[${new Date().toLocaleString()}] Ping sent successfully`);
//     }
//     catch (error) {
//         console.error(`[${new Date().toLocaleString()}] Ping failed:`, error.message);
//     }
// };

// // Schedule the cron job to run every minute (*/1 * * * *)
// cron.schedule("*/1 * * * *", pingCheck);

// const cron = require('node-cron');

// // Set up a cron job to ping every 10 minutes
// cron.schedule('*/10 * * * *', () => {
//   console.log('Sending ping to server...');
//   // You can send an HTTP request to ping another service or perform a task here
//   fetch(`${PING_URL}/health/pingHealth`) // Adjust the URL as necessary
//     .then((response) => response.text())
//     .then((data) => {
//       console.log('Ping successful:', data);
//     })
//     .catch((error) => {
//       console.error('Ping failed:', error);
//     });
// });

// pingController.js (Controller File)
export const pingHealth = (req, res) => {
    console.log("Ping received from cron job...");
    res.status(200).send("Pong");
};

import cron from "node-cron";
import axios from "axios";

// It's better to use an environment variable for the URL
const PING_URL = "https://startsy.onrender.com";

cron.schedule("*/10 * * * *", async () => {
    try {
        console.log("Sending ping to server...", new Date().toISOString());
        const response = await axios.get(`${PING_URL}/health/pingHealth`);
        console.log("Ping successful:", response.status);
    } catch (error) {
        console.error("Ping failed:", error.message);
        // Optionally log the full error response for debugging
        if (error.response) {
            console.error("Error response:", error.response.data);
        }
    }
});

console.log("Cron job scheduled");
