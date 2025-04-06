import { Comment } from "../../models/comment.model.js";
import { Post } from "../../models/post.model.js";
import { Notification } from "../../models/notification.model.js";
import { User } from "../../models/user.model.js";
import sendNotification from "../../utils/sendNotification.js";

export const createComment = async (req, res) => {
    try {
        const { comment, message } = req.body;
        console.log(message , "");
        
        

        const userId = req.user._id;
        const postId = req.params.id;

        const user = await User.findById(userId);

        const newComment = await Comment.create({
            comment,
            userId,
            postId,
        });


        let post;
        if (newComment) {
            post = await Post.findByIdAndUpdate({
                _id: postId
            },
                {
                    $push: {
                        postComments: newComment._id,
                    }
                }, { new: true });
        }

        await Notification.create({
            receivingUserId: post.user_id,
            sendingUserId: req.user._id,
            postId: post._id,
            notificationType: "commentPost",
            notificationMessage: message  ? message : "Commented on your post",
        });



        var receiverIdToken = await User.findOne({ _id: post.user_id }).select("notificationToken");
        var rec2 = await User.findOne({ _id: userId }).select("userName");
        var userNameForNotification = rec2.userName;
        var response = await sendNotification(receiverIdToken.notificationToken, `${userNameForNotification} commented on your post`, comment )
        console.log(response, "response from notification");

        return res.status(200).json({
            message: "Comment created successfully",
            newComment,
            profilePhoto: user.profilePhoto,
            userName: user.userName,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error while creating comment",
            error: error.message,
        });
    }
}