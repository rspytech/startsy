import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    receivingUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    sendingUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    notificationType: {
        type: String,
        enum: [
            "upvotePost",
            "upvoteProfile",
            "jobApplied",
            "joinedCommunity",
            "commentPost",
            "teammateAdded",
            "suggestion",
        ],
    },
    notificationMessage: {
        type: String,
    },
    appliedJobRole: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export const Notification = new mongoose.model("Notification", notificationSchema);
