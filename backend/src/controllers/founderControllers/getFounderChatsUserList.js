import { Founder } from "../../models/founder.model.js";
import { Conversation } from "../../models/conversation.model.js";
import { User } from "../../models/user.model.js";

export const getFounderChatUserList = async (req, res) => {
    try {
        const founderId = req.user._id;

        // Find the founder profile and populate chatUsers
        const user = await User.findById(founderId).populate({
            path: "roleId",
            populate: {
                path: "chatUsers",
                select: "_id userName profilePhoto role",
            },
        });

        const founderProfile = user.roleId; // roleId is populated with chatUsers
        if (!founderProfile || !founderProfile.chatUsers) {
            return res.status(404).json({ error: "Founder profile or chat users not found" });
        }

        // Fetch the last message for each user in chatUsers
        const chatList = await Promise.all(
            founderProfile.chatUsers.map(async (chatUser) => {
                const conversation = await Conversation.findOne({
                    members: { $all: [founderId, chatUser._id] },
                    $expr: { $eq: [{ $size: "$members" }, 2] },
                    isGroup: false,
                })
                    .sort({ updatedAt: -1 })
                    .populate("lastMessage");

                return {
                    user: {
                        _id: chatUser._id,
                        userName: chatUser.userName,
                        profilePhoto: chatUser.profilePhoto,
                        role: chatUser.role,
                    },
                    lastMessage: conversation?.lastMessage || null,
                };
            })
        );

        console.log(chatList);

        return res.status(200).json(chatList);
    } catch (error) {
        console.error(`Error fetching founder chat user list: ${error.message}`);
        res.status(500).json({ error: "Failed to get founder chat user list" });
    }
};
