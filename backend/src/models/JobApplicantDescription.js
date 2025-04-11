import mongoose from "mongoose";

const jobApplicantDescription = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPost',
        required: true
    },
    userDescription: {
        type: String,
    },
    resume: {
        type : String
    },

} , {timestamps: true});

export const JobApplicantDescription = mongoose.model("JobApplicantDescription", jobApplicantDescription);