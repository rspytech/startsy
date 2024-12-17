import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    content : {
        type : String,
    },
    newsletterImage : {
        type : String
    },
    taggedUserName : {
        type : String,
        required : true,
    },
    taggedUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    likes : {
        type : Number,
        default : 0,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
});

export const Newsletter = mongoose.model("Newsletter", newsletterSchema);