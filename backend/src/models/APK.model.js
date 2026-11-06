import mongoose from "mongoose";

const ApkSchema = new mongoose.Schema(
    {
        url: { type: String },
        versionNumber: { type: Number },
    },
    { timestamps: true }
);

export const Apk = new mongoose.model("APKurl", ApkSchema);
