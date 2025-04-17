// NOTE : Pass the chatType as (group or individual) from frontend

import { Conversation } from "../../models/conversation.model.js";
import { User } from "../../models/user.model.js";
export const getMessage = async (req, res) => {
    try{
        const receiverId = req.params.id;
        const senderId = req.user._id;
        const chatType = req.params.chatType;
        
        let conversation;
        let senderProfilePhoto;
        let recieverProfilePhoto;

        if(chatType === "individual"){
            const [sender, receiver] = await Promise.all([
                User.findById(senderId).select("profilePhoto"),
                User.findById(receiverId).select("profilePhoto"),
            ]);
            senderProfilePhoto = sender?.profilePhoto;
            recieverProfilePhoto = receiver?.profilePhoto;
            conversation = await Conversation.findOne({
                members: {$all: [senderId, receiverId]},
                isGroup : false,
            }).populate({
                path: "messages",
                populate: {
                  path: "message.NewsletterContent.taggedUser",
                  model: "User",
                  select: "username profilePhoto",
                },
            });    
        }
        else{
            conversation = await Conversation.findOne({
                isGroup : true,
                communityId : receiverId,
            }).populate("messages");
        }
        console.log(conversation.messages[conversation.messages.length -1] , "ppp");

        if(!conversation){
            return res.status(404).json({message: "Conversation not found" , senderProfilePhoto,
                recieverProfilePhoto,})
        }
        return res.status(200).json({
            message : "Messages fetched successfully",
            data : conversation,
            senderProfilePhoto,
            recieverProfilePhoto,
        })
    }
    catch (error) {
        return res.status(400).json({
            message: "Error fetching messages",
            error: error.message,
        })
    }
}