import { Message } from "../../models/message.model.js";

const markAsRead =async (req,res)=>{
    const { senderId, receiverId } = req.body;
    console.log(senderId);
    console.log(receiverId);


    try {
        await Message.updateMany(
            {
                isRead: false,
                senderId: receiverId,  // Other user is the sender
                receiverId: senderId   // Current user is the receiver
            },
            { $set: { isRead: true } }
        );
        res.json({ success: true, message: "Messages marked as read" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

export default markAsRead