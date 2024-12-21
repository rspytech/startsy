import { User } from "../models/user.model.js";
import { Founder } from "../models/founder.model.js";
import { Freelancer } from "../models/freelancer.model.js";
import { CommunityMember } from "../models/communityMember.model.js";
import { Post } from "../models/post.model.js";

export const getUsersProfiles = async (req, res) => {
    try {
        // Map roles to their respective models
        const roleMap = {
            Founder: Founder,
            Freelancer: Freelancer,
            CommunityMember: CommunityMember,
        };

        const userId = req.params.id;
        console.log("User ID:", userId);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const userRole = user.role;
        console.log("User Role:", userRole);

        const role = roleMap[userRole];
        if (!role) {
            return res.status(400).json({ message: "Invalid user role." });
        }

        // Fetch the user's profile with basic `posts` population
        const userProfile = await role.findOne({ user_id: userId })
            .populate("user_id") // Populate user details
            .populate({ path: "posts" }) // Basic population for `posts`
            .lean();

        console.log("User Profile:", userProfile);

        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found. Ensure the user_id is correctly linked in the role-specific collection." });
        }

        // Conditionally populate `jobPosts` or `communityPost` in each post
        const populatedPosts = await Promise.all(
            userProfile.posts.map(async (post) => {
                if (post.type === "jobPost") {
                    return await Post.findById(post._id)
                        .populate("jobPosts")
                        .lean();
                } else if (post.type === "communityPost") {
                    return await Post.findById(post._id)
                        .populate("communityPost")
                        .lean();
                }
                return post; // Return the post as-is if type doesn't match
            })
        );

        // Update `userProfile.posts` with the conditionally populated posts
        userProfile.posts = populatedPosts;

        return res.status(200).json({
            message: "Profile details fetched successfully.",
            data: userProfile,
            // connectionCount: counts[0] || { followersCount: 0, followingCount: 0 },
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Error while fetching profile details.", error: error.message });
    }
};
