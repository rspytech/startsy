import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
    {
        recommendationId: {
            type: String, // This stores the unique recommendation ID
            required: true,
            unique: true,
        },
        matchingFounders: [
            {
                type: mongoose.Schema.Types.ObjectId, // This references the matching founders' IDs
                ref: "General",
            },
        ],
    },
    { timestamps: true }
);

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

export default Recommendation;
