import mongoose from "mongoose";

const ApkuserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    versionNumber: { type: Number }


}, { timestamps: true })

export const Apkuser = new mongoose.model("ApkUser", ApkuserSchema);