import { Comment } from "../../models/comment.model.js";

export const getComments = async(req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ postId: postId }).sort({ createdAt: -1 });
        if(!comments){
            return res.status(404).json({ message: "No comments found" });
        }
        return res.status(200).json({
            message : "Comments fetched successfully",
            data: comments,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching comments" });
    }
}