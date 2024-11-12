import { Founder } from "../../models/founder.model.js";
import { Conversation } from "../../models/conversation.model.js";

export const getFounderChatUserList = async (req, res) => {
    try {
        const founderId = req.user._id;

        // Find the founder profile and populate the chatUsers array with necessary fields
        const founderProfile = await Founder.findOne({ user_id: founderId }).populate("chatUsers");

        if (!founderProfile) {
            return res.status(404).json({ error: "Founder profile not found" });
        }

        // Fetch the last message for each user in chatUsers
        const chatList = await Promise.all(founderProfile.chatUsers.map(async (chatUser) => {
            const conversation = await Conversation.findOne({
                members: { $all: [founderId, chatUser._id] }
            }).sort({ updatedAt: -1 }).populate("lastMessage");

            return {
                user: {
                    _id: chatUser._id,
                    userName: chatUser.userName,
                    profilePhoto: chatUser.profilePhoto,
                },
                lastMessage: conversation?.lastMessage || null
            };
        }));

        return res.status(200).json(chatList);
    }
    catch (error) {
        console.error(`Error fetching founder chat user list: ${error.message}`);
        res.status(500).json({ error: "Failed to get founder chat user list" });
    }
};
