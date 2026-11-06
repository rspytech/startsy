import { Post } from "../models/post.model.js";

export const getNotificationPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate("user_id");
        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }
        const postType = post.type;
        if (postType === "jobPost") {
            const populatedJobPost = await post.populate("jobPosts");
            return res.status(200).json({
                message: "Job post fetched successfully",
                data: populatedJobPost,
            });
        } else if (postType === "communityPost") {
            const populatedCommunityPost = await post.populate("communityPost");
            return res.status(200).json({
                message: "Community post fetched successfully",
                data: populatedCommunityPost,
            });
        }
        return res.status(200).json({
            message: "Post fetched successfully",
            data: post,
        });
    } catch (error) {
        return res.status(500).json({ message: `Error while fetching notification post ${error.message}` });
    }
};
