import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        enum: ["photo", "video", "textBlog", "jobPost", "communityPost"],
        required: true,
    },
    caption: {
        type: String,
    },
    mediaUrl: {
        type: String,  // Used for photo and video URLs
    },
    mediaType: {
        type: String,
        enum: ["image", "video"],  // Only for photo/video types
    },
    content: {
        type: String,  // Only for textBlog type
    },
    jobPosts : {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "JobPost",
    },
    communityPost : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Community",
    },
    postUpvotes: {
        type: Number,
        default: 0,
    },
    postComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    likedBy : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
    createdAt: { 
        type: Date,
        default: Date.now
    },
});

export const Post = mongoose.model("Post", postSchema);