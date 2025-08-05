import mongoose from 'mongoose';

const postVectorSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        unique: true,
    },
    vector: {
        type: [Number],
        required: true
    }
}, { timestamps: true });

export const PostVector = mongoose.model("PostVector", postVectorSchema);
