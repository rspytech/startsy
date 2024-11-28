import { Conversation } from "../../models/conversation.model.js";
import { Message } from "../../models/message.model.js";
import { getReceiverSocketId } from "../../socket/socketIo.js";

const sendMessage = async (req, res, io) => {
    try {
        const { message, isGroup } = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;

        let conversation;

        if (isGroup) {
            // Find the group conversation
            conversation = await Conversation.findOne({ communityId: receiverId, isGroup: true });
            if (!conversation) {
                return res.status(404).json({ error: "Group not found" });
            }
        } else {
            // Find or create a one-to-one conversation
            conversation = await Conversation.findOne({
                members: { $all: [senderId, receiverId] },
                isGroup: false,
            });
            if (!conversation) {
                conversation = await Conversation.create({
                    members: [senderId, receiverId],
                    isGroup: false,
                });
            }
        }

        const newMessage = await Message.create({
            senderId,
            message,
        });

        // Update conversation with new message
        conversation.messages.push(newMessage._id);
        conversation.lastMessage = newMessage._id;
        await conversation.save();

        // Emit message to users
        if (isGroup) {
            io.to(receiverId).emit("groupMessage", newMessage);  // Updated to match the event name
        } else {
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("privateMessage", newMessage);  // Updated to match the event name
            }
        }

        return res.status(201).json(newMessage);
    } catch (error) {
        console.log(`Error sending message: ${error.message}`);
        res.status(500).json({ error: "Failed to send message" });
    }
};

export default sendMessage;
