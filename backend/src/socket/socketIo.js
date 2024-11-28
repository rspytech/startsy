import { Server } from "socket.io";

const userSocketMap = {};  // Mapping of user IDs to their socket IDs
let io;
export const configureSocketIO = (server) => {
    io = new Server(server, {
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

        // Handle one-to-one private messages
        socket.on("privateMessage", ({ senderId, receiverId, message }) => {
            const receiverSocketId = userSocketMap[receiverId];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("privateMessage", { senderId, message });
                console.log(`Private message from ${senderId} to ${receiverId}: ${message}`);
            } else {
                console.log(`User ${receiverId} is not connected`);
            }
        });

        // Handle group joining logic
        socket.on("joinGroup", async (groupId) => {
            try {
                const group = await Conversation.findById(groupId);
                if (!group || !group.isGroup) {
                    console.error("Invalid group");
                    return;
                }
                socket.join(groupId);
                console.log(`User ${socket.id} joined group: ${groupId}`);
                io.to(groupId).emit("systemMessage", { message: "A new user has joined the group." });
            }
            catch (error) {
                console.error("Error joining group:", error.message);
                socket.emit("error", { error: "Failed to join group" });
            }
        });

        // Handle group messages
        socket.on("groupMessage", ({ senderId, groupId, message }) => {
            io.to(groupId).emit("groupMessage", { senderId, message });
            console.log(`Group message from ${senderId} to group ${groupId}: ${message}`);
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


export const getSocketInstance = () => {
    if (!io) {
        throw new Error("Socket.IO is not initialized");
    }
    return io;
};