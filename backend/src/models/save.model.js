import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    saveId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }]
});

export const Save = mongoose.model("Save", saveSchema);