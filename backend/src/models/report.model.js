import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    reportingUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    reportedUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    reportedPost : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
    },
    reportType : {
        type : String,
        enum : ['post', 'user'],
    },
});

export const Report = mongoose.model("Report", reportSchema);