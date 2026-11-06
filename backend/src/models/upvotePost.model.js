import mongoose from "mongoose";

const upvotePostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

upvotePostSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const UpvotePost = mongoose.model("UpvotePost", upvotePostSchema);
