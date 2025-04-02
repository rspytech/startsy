import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "type", // Reference to Post model
        required: true,
    },
    reports: [
        {
            reportedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to User model
                required: true,
            },
            reason: {
                type: String,
                // enum: ["Spam", "Inappropriate", "Hate Speech", "Misinformation", "Other"],
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    type: {
        type: String,
        enum: ["Post", "User"], // Defines whether it's a post or profile report
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Reviewed", "Restored"],
        default: "Pending",
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
    }
});

export const Report = mongoose.model("Report", ReportSchema);