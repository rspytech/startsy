// Investor Feed (Chat Page) Recent Chatting User List
import { Investor } from "../../models/investor.model.js";
import { Conversation } from "../../models/conversation.model.js";
import { General } from "../../models/general.model.js";

export const getInvestorChatUserList = async (req, res) => {
    try {
        const investorId = req.user._id;

        // Find the investor profile and populate the chatUsers array with necessary fields
        
        // If any error can also try this while testing
        // const investorProfile = await Investor.findOne({ user_id: investorId }).populate("chatUsers", "userName profilePhoto");
        const investorProfile = await General.findOne({ user_id: investorId }).populate("chatUsers");

        if (!investorProfile) {
            return res.status(404).json({ error: "Investor profile not found" });
        }

        // Fetch the last message for each user in chatUsers
        const chatList = await Promise.all(investorProfile.chatUsers.map(async (chatUser) => {
            const conversation = await Conversation.findOne({
                members: { $all: [investorId, chatUser._id] }
            }).sort({ updatedAt: -1 }).populate("lastMessage");

            return {
                user: {
                    _id: chatUser._id,
                    userName: chatUser.userName,
                    profilePhoto: chatUser.profilePhoto,
                    role  : chatUser.role
                },
                lastMessage: conversation?.lastMessage || null
            };
        }));

        return res.status(200).json(chatList);

    }
    catch (error) {
        console.error(`Error fetching investor chat user list: ${error.message}`);
        res.status(500).json({ error: "Failed to get investor chat user list" });
    }
};
