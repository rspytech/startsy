import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import { Post } from "../../models/post.model.js";
import { Comment } from "../../models/comment.model.js";
import { Message } from "../../models/message.model.js";
import { Community } from "../../models/community.model.js";
import { Notification } from "../../models/notification.model.js";

import { General } from "../../models/general.model.js";

export const deleteUserAccount = async (req, res) => {
    // Start a MongoDB session for transaction
    const userId = req.params.id;
    const session = await mongoose.startSession();
    const user = await User.findById(userId).populate("roleId");
    const userChatUserList = user.roleId.chatUsers;

    // console.log(userChatUserList);

    const communityPosts = await Post.find({ user_id: userId }, { type: "communityPost" });

    const userRole = user.role;
    session.startTransaction();

    try {
        // 1. Delete all user's posts
        await Post.deleteMany(
            {
                user_id: userId,
            },
            { session }
        );

        communityPosts.map(async (post) => {
            await Community.deleteMany({ _id: post.Community });
        });
        // console.log("reached here");

        // 2. Delete all comments made by the user
        await Comment.deleteMany({ userId }, { session });

        // 3. Remove user's likes from posts
        await Post.updateMany({ likedBy: userId }, { $pull: { likedBy: userId } }, { session });

        // console.log("reached here");

        // 4. Remove user from other users' followers/following lists
        await User.updateMany(
            { $or: [{ followers: userId }, { following: userId }] },
            {
                $pull: {
                    followers: userId,
                    following: userId,
                },
            },
            { session }
        );
        // console.log("reached here");

        // userChatUserList.map(async (id) => {
        //     const getUser = await User.findById(id).populate("roleId");
        //     console.log(getUser);
        //     if(!getUser)return

        //     // 5. Remove user from other users' chat user lists
        //     const indexOfUserToBeRemoved = getUser.roleId.chatUsers.indexOf(id);
        //     getUser.roleId.chatUsers.splice(indexOfUserToBeRemoved, 1);

        //     await getUser.roleId.save({ session });
        // });

        for (const id of userChatUserList) {
            const getUser = await User.findById(id).populate("roleId");
            const indexOfUserToBeRemoved = getUser.roleId.chatUsers.indexOf(id);
            getUser.roleId.chatUsers.splice(indexOfUserToBeRemoved, 1);
            await getUser.roleId.save({ session });
        }

        // 6. Delete all user's messages
        await Message.deleteMany(
            {
                $or: [{ sender: userId }, { receiver: userId }],
            },
            { session }
        );

        // 7. Delete all user's notifications
        await Notification.deleteMany(
            {
                $or: [{ sendingUserId: userId }, { receivingUserId: userId }],
            },
            { session }
        );

        if (userRole === "CommunityMember") {
            await General.deleteOne({ user_id: userId });
        }

        if (userRole === "Founder") {
            await General.deleteOne({ user_id: userId });
        }

        if (userRole === "Investor") {
            await General.deleteOne({ user_id: userId });
        }

        // 8. Delete the user document itself
        await User.findByIdAndDelete(userId, { session });

        // If everything is successful, commit the transaction
        await session.commitTransaction();

        return res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(404).json({
            message: "Error while deleting user account",
            error: error.message,
        });
    } finally {
        // End the session
        session.endSession();
    }
};
