import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import cron from 'node-cron';
import moment from 'moment-timezone';

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
        const { postId, likeStatus } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const postUserId = post.user_id;
        const roleDetails = await User.findById(postUserId).populate("roleId");

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
            return res.status(200).json({ message: "Post liked successfully" });
        } else if (likeStatus === "unlike") {
            await post.updateOne({ $inc: { postUpvotes: -1 } });
            await roleDetails.roleId.updateOne({
                $inc: {
                    totalUpvotes: -1,
                    upvotesPerDay: -1,
                },
            });
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
