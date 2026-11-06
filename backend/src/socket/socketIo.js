// Real-time chat over Socket.IO. Phones connect, register who they are, and then
// send/receive private and group messages instantly. Messages are also saved to MongoDB,
// and a push notification is sent when needed.

import { Server } from "socket.io";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import sendNotification from "../utils/sendNotification.js";
const userSocketMap = {}; // Mapping of user IDs to their socket IDs
let io;

export const configureSocketIO = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
    const chatScreen = io.of("/chatScreen");

    chatScreen.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Register the user and deliver pending messages
        socket.on("registerUser", async ({ receiverId, senderId, message }) => {
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
                var userName = await User.findOne({ _id: senderId }).select("userName profilePhoto");
                var userNameForNotification = userName.userName;
                var pfp = userName.profilePhoto;

                // console.log(receiverId, "yeh yogesh hona chiaye");

                var receiverIdToken = await User.findOne({ _id: receiverId }).select("notificationToken");

                if (!conversation) {
                    conversation = await Conversation.create({
                        members: [senderId, receiverId],
                        isGroup: false,
                    });
                }

                // Save message
                const receiverSocketId = userSocketMap[receiverId];

                var isRead;
                if (receiverSocketId) {
                    isRead = true;
                } else {
                    isRead = false;
                }

                if (!receiverSocketId) {
                    var response = await sendNotification(
                        receiverIdToken.notificationToken,
                        `${userNameForNotification} sent you a message`,
                        message
                    );
                    console.log(response, "response from notification");
                }
                const newMessage = await Message.create({ senderId, message, receiverId, isRead });

                conversation.messages.push(newMessage._id);
                conversation.lastMessage = newMessage._id;
                await conversation.save();

                // Deliver message
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("ShuffleChatList", { senderId, message });
                    chatScreen.to(receiverSocketId).emit("privateMessage", newMessage);
                } else {
                    console.log(`User ${receiverId} is offline. Message stored in DB.`);
                }
            } catch (error) {
                console.error("Error handling privateMessage:", error.message);
            }
        });

        socket.on("joinGroup", async ({ groupId, userId }) => {
            userSocketMap[userId] = socket.id;
            try {
                const conversation = await Conversation.findOne({
                    communityId: groupId,
                    isGroup: true,
                });

                if (!conversation) {
                    socket.emit("error", { message: "Group not found" });
                    return;
                }

                if (!conversation.members.includes(userId)) {
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
            // console.log("hi");

            try {
                const conversation = await Conversation.findOne({ communityId: groupId, isGroup: true });

                if (!conversation) {
                    console.error("Group not found");
                    return;
                }

                // Save group message

                const newMessage = await Message.create({ senderId, message, groupId });
                const pfp = await User.findById(senderId).select("profilePhoto userName");

                const profilePhoto = pfp.profilePhoto;
                newMessage.senderId = pfp; // Set senderId in the message object
                console.log(newMessage);

                var obj = {
                    ...newMessage,
                };

                console.log(obj);

                // console.log({newMessage , profilePhoto});

                conversation.messages.push(newMessage._id);
                conversation.lastMessage = newMessage._id;
                await conversation.save();

                // Emit to group
                chatScreen.to(groupId).emit("groupMessage", { data1: newMessage, pfp: profilePhoto });

                var allUsersInCommunity = conversation.members;
                console.log(allUsersInCommunity);
                var rec2 = await User.findOne({ _id: senderId }).select("userName");
                var userNameForNotification = rec2.userName;

                for (var items of allUsersInCommunity) {
                    if (items == senderId) continue;
                    var receiverIdToken = await User.findById(items).select("notificationToken");
                    console.log(receiverIdToken, "yeh yogesh ka token ");
                    console.log(items);

                    var receiverSocketId = userSocketMap[items.toString()];

                    if (!receiverSocketId) {
                        var response = await sendNotification(
                            receiverIdToken.notificationToken,
                            `${userNameForNotification} sent a message`,
                            message
                        );
                        console.log(response, "response from notification");
                    }
                }
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

    io.on("connection", (socket) => {
        console.log("User connected of global socket:", socket.id);
        socket.on("registerUser", (id) => {
            userSocketMap[id] = socket.id;
            console.log(`User ${id} registered with socket ID ${socket.id}`);
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
