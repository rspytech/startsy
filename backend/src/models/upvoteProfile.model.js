import mongoose from "mongoose";

const upvoteProfileSchema = new mongoose.Schema({
    investorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    founderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// upvoteProfileSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const upvoteProfile = mongoose.model("upvoteProfile", upvoteProfileSchema);