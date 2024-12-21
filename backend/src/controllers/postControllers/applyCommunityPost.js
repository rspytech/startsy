import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { Notification } from "../../models/notification.model.js";

export const applyCommunity = async (req, res) => {
    try {
        const communityPostId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(communityPostId).populate("communityPost");
        if (!post) return res.status(404).json({ message: "Community not found" });

        const user = await User.findById(userId);
        const communityRules = post.communityPost.communityRules;

        if (!communityRules.toLowerCase().includes(user.role.toLowerCase())) {
            return res.status(403).json({ message: "You don't have permission to apply to this community" });
        }

        if (post.communityPost.communityMembers.includes(userId)) {
            return res.status(403).json({ message: "You are already a member of this community" });
        }

        // Add user to community members and save
        post.communityPost.communityMembers.push(userId);
        await post.communityPost.save();

        // Add community to user’s community list and save
        user.communityList.push(post.communityPost._id);
        await user.save();

        await Notification.create({
            receivingUserId : post.user_id, 
            sendingUserId : req.user._id,
            notificationType: "joinedCommunity",
            notificationMessage : `Joined ${post.communityPost.communityName}`,
        });

        console.log("Community members updated:", post.communityPost.communityMembers);
        console.log("User's community list updated:", user.communityList);

        return res.status(200).json({
            message: "You have successfully applied to the community",
        });
    }
    catch (error) {
        console.error("Error in applyCommunity:", error);
        return res.status(500).json({
            message: "Error applying to community",
            error: error.message,
        });
    }
};
