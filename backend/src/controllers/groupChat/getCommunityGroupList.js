// import { User } from "../../models/user.model.js"

// export const getCommunityGroupChatList = async (req, res) => {
//     try{
//         const user_id = req.user._id;

//         const user = await User.findById(user_id).populate("communityList");
//         if(!user){
//             return res.status(404).json({message: "User not found"})
//         }
//         const communityGroupChatList = user.communityList;

//         if(!communityGroupChatList || communityGroupChatList.length == 0){
//             return res.status(404).json({message: "No community group chat list found"})
//         }

//         return res.status(200).json({
//             message: "Community group chat list retrieved successfully",
//             data: communityGroupChatList,
//         });
//     }
//     catch(error){
//         return res.status(500).json({message: "Error while fetching group chats", error: error.message});
//     }
// }


import { User } from "../../models/user.model.js";
import { Conversation } from "../../models/conversation.model.js";

export const getCommunityGroupChatList = async (req, res) => {
    try {
        const user_id = req.user._id;

        // Find user and populate community list
        const user = await User.findById(user_id).populate({
            path: "communityList",
            select: "_id communityName communityDescription"
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.communityList || user.communityList.length === 0) {
            return res.status(404).json({ message: "No communities found" });
        }

        // Fetch conversations with last messages for each community
        const communityGroupChatList = await Promise.all(user.communityList.map(async (community) => {
            const conversation = await Conversation.findOne({
                communityId: community._id,
                isGroup: true
            })
            .sort({ updatedAt: -1 })
            .populate("lastMessage")

            return {
                community: {
                    _id: community._id,
                    communityName: community.communityName,
                    communityDescription: community.communityDescription
                },
                conversation: {
                    _id: conversation?._id,
                    lastMessage: conversation?.lastMessage || null,
                    memberCount: conversation?.members?.length || 0,
                    updatedAt: conversation?.updatedAt
                }
            };
        }));

        // Sort by last message timestamp if exists, otherwise by community creation date
        const sortedChatList = communityGroupChatList.sort((a, b) => {
            const timeA = a.conversation.lastMessage?.createdAt || a.community.createdAt;
            const timeB = b.conversation.lastMessage?.createdAt || b.community.createdAt;
            return new Date(timeB) - new Date(timeA);
        });

        return res.status(200).json({
            message: "Community group chat list retrieved successfully",
            data: sortedChatList
        });
    }
    catch (error) {
        console.error("Error in getCommunityGroupChatList:", error);
        return res.status(500).json({
            message: "Error while fetching group chats",
            error: error.message
        });
    }
};