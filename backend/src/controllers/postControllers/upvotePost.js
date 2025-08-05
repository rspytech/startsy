import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { Notification } from "../../models/notification.model.js";
import cron from 'node-cron';
import moment from 'moment-timezone';
import { UpvotePost } from "../../models/upvotePost.model.js";
import sendNotification from "../../utils/sendNotification.js";
import {userVectorQueue} from "../../vector/vector.queue.js";

cron.schedule('0 0 * * *', async () => {
    try {
        console.log("Cron job started: Resetting upvotes for the day");

        // Get all users and reset their upvotesPerDay
        const users = await User.find().populate("roleId");
        for (let user of users) {
            if (user.roleId) {
                let today = moment().tz('Asia/Kolkata').format('YYYY-MM-DD');
                console.log(today);
                // Update the role details for each user to reset upvotesPerDay
                await user.roleId.updateOne({
                    upvotesPerDay: 0,
                    currentUpvoteDate: today,
                });
                await user.roleId.save();
            }
        }

        console.log("Cron job completed: Upvotes reset for all users.");
    } catch (error) {
        console.error("Error in cron job:", error);
    }
});

export const upvotePost = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId);

        const { postId, likeStatus } = req.params;

        const post = await Post.findById(postId);
        console.log(post);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const user = await User.findById(userId);
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const postUserId = post.user_id;
        const roleDetails = await User.findById(postUserId).populate("roleId");

        console.log(likeStatus, postUserId, roleDetails);


        if (likeStatus === "like") {
            await Notification.create({
                receivingUserId: post.user_id,
                sendingUserId: userId,
                postId: post._id,
                notificationType: "upvotePost",
                notificationMessage: "UpVoted your post.",
            });
            await UpvotePost.findOneAndUpdate(
                { postId, userId },
                { postId, userId },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            post.likedBy.push(userId);
            await post.save();

            var receiverIdToken = await User.findOne({ _id: post.user_id }).select("notificationToken");
            var rec2 = await User.findOne({ _id: userId }).select("userName");
            var userNameForNotification = rec2.userName;

            console.log(receiverIdToken.notificationToken);
            console.log(userNameForNotification);

            
            var response = await sendNotification(receiverIdToken.notificationToken, `${userNameForNotification}`, "upvoted your post")
            console.log(response, "response from notification");
            
        }

        if (user.role === "Investor") {
            if (roleDetails.roleId && roleDetails.roleId.investorUpvotes !== undefined) {
                if (likeStatus === "like") {
                    await roleDetails.roleId.updateOne({
                        $inc: { investorUpvotes: 1 }
                    });
                } else if (likeStatus === "unlike") {
                    await roleDetails.roleId.updateOne({
                        $inc: { investorUpvotes: -1 }
                    });
                }
                await roleDetails.roleId.save();
            }
        }

        // Handle "like" and "unlike" actions
        if (likeStatus === "like") {
            await post.updateOne({ $inc: { postUpvotes: 1 } });
            await roleDetails.roleId.updateOne({
                $inc: {
                    totalUpvotes: 1,
                    upvotesPerDay: 1,
                },
            });
            await userVectorQueue.add("generateUserVector", { userId: userId.toString()});
            return res.status(200).json({ message: "Post liked successfully" });
        } else if (likeStatus === "unlike") {
            await post.updateOne({
                $inc: { postUpvotes: -1 },
                $pull: { likedBy: userId },
            });
            await roleDetails.roleId.updateOne({
                $inc: {
                    totalUpvotes: -1,
                    upvotesPerDay: -1,
                },
            });
            await UpvotePost.findOneAndDelete({ postId, userId });
            await userVectorQueue.add("generateUserVector", { userId: userId.toString()});
            return res.status(200).json({ message: "Post unliked successfully" });
        } else {
            return res.status(400).json({ message: "Invalid like status" });
        }
    } catch (error) {
        return res.status(400).json({
            message: "Error while upvoting the post",
            error: error.message,
        });
    }
};
