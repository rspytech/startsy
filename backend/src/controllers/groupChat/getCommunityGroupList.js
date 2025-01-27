import { User } from "../../models/user.model.js"

export const getCommunnityGroupChatList = async (req, res) => {
    try{
        const user_id = req.user._id;

        const user = await User.findById(user_id).populate("communityList");
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const communityGroupChatList = user.communityList;

        if(!communityGroupChatList || communityGroupChatList.length == 0){
            return res.status(404).json({message: "No community group chat list found"})
        }

        return res.status(200).json({
            message: "Community group chat list retrieved successfully",
            data: communityGroupChatList,
        });
    }
    catch(error){
        return res.status(500).json({message: "Error while fetching group chats", error: error.message});
    }
}