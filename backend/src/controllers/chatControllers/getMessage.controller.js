// NOTE : Pass the chatType as (group or individual) from frontend

import { Conversation } from "../../models/conversation.model.js";

export const getMessage = async (req, res) => {
    try{
        const receiverId = req.params.id;
        const senderId = req.user._id;
        const chatType = req.params.chatType;
        
        let conversation;

        if(chatType === "individual"){
            conversation = await Conversation.findOne({
                members: {$all: [senderId, receiverId]}
            }).populate({
                path: 'messages',
                populate:{
                    path: 'senderId',
                    select: "profilePhoto"
                }
            });    
        }
        else{
            conversation = await Conversation.findOne({
                isGroup : true,
                communityId : receiverId,
            }).populate("messages");
        }
        console.log(conversation);

        if(!conversation){
            return res.status(404).json({message: "Conversation not found"})
        }
        return res.status(200).json({
            message : "Messages fetched successfully",
            data : conversation,
        })
    }
    catch (error) {
        return res.status(400).json({
            message: "Error fetching messages",
            error: error.message,
        })
    }
}