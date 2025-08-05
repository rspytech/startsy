// import { Conversation } from "../../models/conversation.model.js";
// import { Message } from "../../models/message.model.js";
// import { getReceiverSocketId } from "../../socket/socketIo.js";

// const sendMessage = async (req, res, io) => {
//     try {
//         const { message, isGroup } = req.body;
//         const senderId = req.user._id;
//         const receiverId = req.params.id;

//         let conversation;

//         if (isGroup) {
//             // Find the group conversation
//             conversation = await Conversation.findOne({ communityId: receiverId, isGroup: true });
//             if (!conversation) {
//                 return res.status(404).json({ error: "Group not found" });
//             }
//         } else {
//             // Find or create a one-to-one conversation
//             conversation = await Conversation.findOne({
//                 members: { $all: [senderId, receiverId] },
//                 isGroup: false,
//             });
//             if (!conversation) {
//                 conversation = await Conversation.create({
//                     members: [senderId, receiverId],
//                     isGroup: false,
//                 });
//             }
//         }

//         const newMessage = await Message.create({
//             senderId,
//             message,
//         });

//         // Update conversation with new message
//         conversation.messages.push(newMessage._id);
//         conversation.lastMessage = newMessage._id;
//         await conversation.save();

//         // Emit message to users
//         if (isGroup) {
//             io.to(receiverId).emit("groupMessage", newMessage);  // Updated to match the event name
//         } else {
//             const receiverSocketId = getReceiverSocketId(receiverId);
//             if (receiverSocketId) {
//                 io.to(receiverSocketId).emit("privateMessage", newMessage);  // Updated to match the event name
//             }
//         }

//         return res.status(201).json(newMessage);
//     } catch (error) {
//         console.log(`Error sending message: ${error.message}`);
//         res.status(500).json({ error: "Failed to send message" });
//     }
// };

// export default sendMessage;

import { Post } from "../../models/post.model.js";
import { Message } from "../../models/message.model.js";
import { getReceiverSocketId } from "../../socket/socketIo.js";
import { Conversation } from "../../models/conversation.model.js";
import sendNotification from "../../utils/sendNotification.js";
import { User } from "../../models/user.model.js";
import { Newsletter } from "../../models/newsletter.model.js";

export const sendMessage = async (req, res, io) => {
    try {
        const postId = req.params.id;
        const senderId = req.user._id;
        const { sharedToUsers  } = req.body;

        console.log(sharedToUsers);
        

        let post;
        post = await Post.findById(postId).populate("user_id");
        var isNewsLetter = false


        if (!post) {
            post = await Newsletter.findById(postId).populate("taggedUser")
            console.log(post,"oooo");
            
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            isNewsLetter = true
        }


        const sharedPost = await Promise.all(
            sharedToUsers.map(async (userId) => {
                const newMessage = await Message.create({
                    senderId,
                    receiverId: userId,
                    message: {
                        postShared: post._id,
                        userName: post.user_id?.userName || post.taggedUser.userName,
                        profilePhoto: post.user_id?.profilePhoto || post.taggedUser.profilePhoto,
                        postImage: post.mediaUrl || post.newsletterImage,
                        postContent:  post.content,
                        postCaption:  isNewsLetter ? post.title : post.content,
                        userIdPosted: post.user_id?._id || post.taggedUser._id,
                        isNewsLetter : isNewsLetter,
                        NewsletterContent : isNewsLetter ? post : null
                    }
                });

                console.log(newMessage , "treeee")
                let conversation = await Conversation.findOne({
                    members: { $all: [senderId, userId] },
                    isGroup: false,
                });

                if (!conversation) {
                    conversation = await Conversation.create({
                        members: [senderId, userId],
                        isGroup: false,
                    });
                }
                // Update conversation
                conversation.messages.push(newMessage._id);
                conversation.lastMessage = newMessage._id;
                await conversation.save();
                console.log("oo");


                var receiverIdToken = await User.findById(userId).select("notificationToken userName");
                var rec2 = await User.findById(senderId).select("userName")
                console.log(receiverIdToken, "ok");

                var response = await sendNotification(receiverIdToken.notificationToken, `${rec2.userName} sent you a post`)
                console.log(response, "response from notification");
                return newMessage;
            })
        );
        // Emit message to users
        // sharedToUsers.forEach((userId) => {
        //     const receiverSocketId = getReceiverSocketId(userId);
        //     if (receiverSocketId) {
        //         io.to(receiverSocketId).emit("sharePost", sharedPost.find((message) => message.receiverId === userId));
        //     }
        // });
        return res.status(200).json(sharedPost);
    }
    catch (error) {
        res.status(404).json({
            error: "Error while sharing post",
            message: error.message,
        });
    }
}