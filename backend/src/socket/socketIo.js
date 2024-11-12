// socket/socketIo.js
import { Server } from "socket.io";

const userSocketMap = {};  // Mapping of user IDs to their socket IDs

export const configureSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Listen for the user to provide their userId after connecting
        socket.on("registerUser", (userId) => {
            userSocketMap[userId] = socket.id;
            console.log(`User ${userId} registered with socket ID ${socket.id}`);
        });

        // Handle group joining logic
        socket.on("joinGroup", (groupId) => {
            socket.join(groupId);
            console.log(`User joined group: ${groupId}`);
        });

        // Remove the user from the map on disconnect
        socket.on("disconnect", () => {
            for (const userId in userSocketMap) {
                if (userSocketMap[userId] === socket.id) {
                    delete userSocketMap[userId];
                    break;
                }
            }
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

// Utility function to get a user's socket ID
export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
};
