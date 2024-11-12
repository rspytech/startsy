import { Founder } from "../../models/founder.model.js";
import { Post } from "../../models/post.model.js";

export const getFounderProfileDetails = async (req, res) => {
    try {
        const userId = req.user._id;

        // Step 1: Fetch founder's profile with basic `posts` population
        const userProfile = await Founder.findOne({ user_id: userId })
            .populate('user_id')  // populate user information
            .populate({ path: 'posts' })  // basic population for `posts`
            .lean();

        if (!userProfile) {
            return res.status(404).json({ message: "Founder not found" });
        }

        // Step 2: Conditionally populate `jobPosts` or `communityPost` in each post based on `type`
        const populatedPosts = await Promise.all(
            userProfile.posts.map(async (post) => {
                if (post.type === 'jobPost') {
                    return await Post.findById(post._id)
                        .populate('jobPosts')
                        .lean();
                } else if (post.type === 'communityPost') {
                    return await Post.findById(post._id)
                        .populate('communityPost')
                        .lean();
                }
                return post;  // Return the post as-is if type doesn't match
            })
        );

        // Update `userProfile.posts` with the conditionally populated posts
        userProfile.posts = populatedPosts;

        return res.status(200).json({
            message: "Founder profile details fetched successfully",
            data: userProfile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while fetching the profile details" });
    }
};


// export const getFounderProfileDetails = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const userProfile = await Founder.findOne({user_id : userId}).populate('user_id').populate("posts");
//         if (!userProfile) {
//             return res.status(404).json({ message: "Founder not found" });
//         }
//         return res.status(200).json({
//             message: "Founder profile details fetched successfully",
//             data: userProfile,
//         })
//     }
//     catch (error) {
//         return res.status(500).json({ message: "Error while fetching the profile details" });
//     }
// }