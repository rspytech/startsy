import { Message } from "../../models/message.model.js";

export const getGroupChatMessage = async (req, res) => {
    try {
        const groupId = req.params.id;
        const groupChats = await Message.find({ groupId }).populate({
            path: "senderId",
            select: "userName profilePhoto",
        });
        if (!groupChats) {
            return res.status(404).json({ message: "No messages found in this group." });
        }
        return res.status(200).json({
            message: "Group chat fetched successfully",
            data: groupChats,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching group chats" });
    }
};
