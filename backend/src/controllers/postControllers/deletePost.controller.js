import { Post } from "../../models/post.model.js";
import { Community } from "../../models/community.model.js";

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({ message: "Post id is required" });
        }
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }
        if (post.type === "communityPost") {
            await Community.findByIdAndDelete({ _id: post.communityPost });
        }
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(404).json({ message: "Internal Server Error" });
    }
};
