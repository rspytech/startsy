import { User } from "../models/user.model.js";
import { Founder } from "../models/founder.model.js";
import { Freelancer } from "../models/freelancer.model.js";
import { CommunityMember } from "../models/communityMember.model.js";
import { Post } from "../models/post.model.js";
import { Investor } from "../models/investor.model.js";
import { calculateProfileCompletion } from "../utils/profileCompletion.js";  // Import the new function

export const getUsersProfiles = async (req, res) => {
    try {
        const roleMap = { Founder, Freelancer, CommunityMember, Investor };
        const loggedInUserId = req.user._id;
        const userId = req.params.id;

        const user = await User.findById(userId).populate("roleId");
        const loggedInUser = await User.findById(loggedInUserId).populate("roleId");

        if (!user) return res.status(404).json({ message: "User not found." });

        const userRole = user.role;
        const role = roleMap[userRole];
        if (!role) return res.status(400).json({ message: "Invalid user role." });

        let status;
        if (user.roleId.chatUsers.includes(loggedInUserId) && loggedInUser.roleId.chatUsers.includes(userId)) {
            status = "Followed";
        } else if (user.followers.includes(loggedInUserId)) {
            status = "Pending Request";
        } else {
            status = "Follow";
        }

        let userProfile = await role.findOne({ user_id: userId })
            .populate({ path: "user_id chatUsers" })
            .populate(userRole !== "Investor" ? { path: "posts" } : null)
            .lean();

        if (!userProfile) return res.status(404).json({ message: "Profile not found." });

        if (userRole !== "Investor") {
            const populatedPosts = await Promise.all(
                userProfile.posts.map(async (post) => {
                    if (post.type === "jobPost") return await Post.findById(post._id).populate("jobPosts").lean();
                    if (post.type === "communityPost") return await Post.findById(post._id).populate("communityPost").lean();
                    return post;
                })
            );
            userProfile.posts = populatedPosts;
        }

        const profileCompletion = calculateProfileCompletion(userProfile, userRole);

        return res.status(200).json({
            message: "Profile details fetched successfully.",
            data: userProfile,
            status,
            profileCompletion
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Error while fetching profile details.", error: error.message });
    }
};
