import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Ensure it's always provided
        },
        ratingStars: {
            type: Number,
            required: true,
        },
        ratingText: {
            type: String,
            defaultValue: "",
            // required: true,
        },
        version: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);
