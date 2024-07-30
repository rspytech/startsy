import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    connectedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const Connection = mongoose.model("Connection", connectionSchema);