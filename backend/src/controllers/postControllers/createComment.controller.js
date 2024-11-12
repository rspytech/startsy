import { Comment } from "../../models/comment.model.js";
import { Post } from "../../models/post.model.js";

export const createComment = async(req, res) => {
    try {
        const {comment} = req.body;
        const userId = req.user._id;
        const postId = req.params.id;

        const newComment = await Comment.create({
            comment,
            userId,
            postId,
        }); 

        if(newComment){
            const post = await Post.findByIdAndUpdate({
                _id: postId
            },
            {
                $push: {
                    postComments: newComment._id,
                }
            },{new : true});
        }

        return res.status(200).json({
            message: "Comment created successfully",
            newComment,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error while creating comment",
            error: error.message,
        });
    }
}