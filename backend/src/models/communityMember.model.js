import mongoose from "mongoose";

const communityMemberSchema = new mongoose.Schema({
    fullName : {                 
        type : String,
        required: true,
    },
    email : {
        type: String,
    },
    country : {
        type: String,
    },
    age : {
        type: Number,
    },
    gender : {
        type: String,
    },
    contactInfo : {
        type: String,
        required: true,
    },
    communityMemberRole : {
        type: String,
    },
    areaOfInterest : {
        type: String,
    },
    contentPrefrence : {
        type : String,  
    },

    requestNotifications: [{
        investor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        requestDate: {
            type: Date,
            default: Date.now,
        }
    }],

    // !! Revisit chatUsers either make here or may be a separate model for it !!

    chatUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    posts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
});

export const CommunityMember = mongoose.model("CommunityMember", communityMemberSchema);