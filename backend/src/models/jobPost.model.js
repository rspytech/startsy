import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
    role : {
        type : String,
    },
    description : {
        type : String,
    },
    duration : {
        type : Number,
    },
    pay : {
        type : String,
    },
    jobApplicants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }]
}, {timestamps : true});

export const JobPost = new mongoose.model("JobPost", jobPostSchema);