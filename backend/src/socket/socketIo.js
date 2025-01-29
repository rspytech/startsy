import { Server } from "socket.io";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
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
    
        // Register the user and deliver pending messages
        socket.on("registerUser", async ({receiverId , senderId , message}) => {
            userSocketMap[senderId] = socket.id;
            console.log(`User ${senderId} registered with socket ID ${socket.id}`);
    
            // Fetch pending messages
            const pendingMessages = await Message.find({ receiverId, senderId, status: "pending" });
            pendingMessages.forEach((msg) => {
                socket.emit("privateMessage", {
                    senderId: msg.senderId,
                    message: msg.message,
                    timestamp: msg.createdAt,
                });
    
                // Mark as delivered
                msg.status = "delivered";
                msg.save();
            });
        });
    
        // Handle private messages
        socket.on("privateMessage", async ({ senderId, receiverId, message }) => {
            try {
                // Find or create conversation
                let conversation = await Conversation.findOne({
                    members: { $all: [senderId, receiverId] },
                    isGroup: false,
                });
    
                if (!conversation) {
                    conversation = await Conversation.create({
                        members: [senderId, receiverId],
                        isGroup: false,
                    });
                }
    
                // Save message
                const newMessage = await Message.create({ senderId, message, receiverId });
    
                conversation.messages.push(newMessage._id);
                conversation.lastMessage = newMessage._id;
                await conversation.save();
    
                // Deliver message
                const receiverSocketId = userSocketMap[receiverId];
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("privateMessage", newMessage);
                } else {
                    console.log(`User ${receiverId} is offline. Message stored in DB.`);
                }
            } catch (error) {
                console.error("Error handling privateMessage:", error.message);
            }
        });

        socket.on("joinGroup", async ({ groupId, userId }) => {
            try {
                const conversation = await Conversation.findOne({ 
                    communityId: groupId, 
                    isGroup: true,
                });
                
                if (!conversation) {
                    socket.emit("error", { message: "Group not found" });
                    return;
                }
                
                if(!conversation.members.includes(userId)){
                    conversation.members.push(userId);
                    await conversation.save();
                }

                socket.join(groupId);

                console.log(`User ${userId} joined group ${groupId}`);
                
                // Agar info dalna ho to ki this user joined the group
                // socket.to(groupId).emit("userJoined", { userId, groupId });
            } catch (error) {
                console.error("Error joining group:", error.message);
                socket.emit("error", { message: "Failed to join group" });
            }
        });
    
        // Handle group messages
        socket.on("groupMessage", async ({ senderId, groupId, message }) => {
            try {
                const conversation = await Conversation.findOne({ communityId: groupId, isGroup: true });
                if (!conversation) {
                    console.error("Group not found");
                    return;
                }
    
                // Save group message
                const newMessage = await Message.create({ senderId, message, groupId });

                console.log(newMessage);
    
                conversation.messages.push(newMessage._id);
                conversation.lastMessage = newMessage._id;
                await conversation.save();
    
                // Emit to group
                io.to(groupId).emit("groupMessage", newMessage);
            } catch (error) {
                console.error("Error handling groupMessage:", error.message);
            }
        });
    
        socket.on("leaveGroup", ({ groupId }) => {
            socket.leave(groupId);
            socket.to(groupId).emit("userLeft", { userId: socket.userId, groupId });
        });

        // Handle disconnection
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