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
        type: String,
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

    tagline: {
        type : String,
    },
    skills : {
        type : String,
    },
    education:{
        type : String,
    },
    certification : [{
        name : {
            type: String,
        },
        url : {
            type: String,
        },
    }], 
    portfolio : [{
        name : {
            type: String,
        },
        url : {
            type: String,
        },
    }],

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

    totalUpvotes: {
        type: Number,
        default : 0,
    },

    upvotesPerDay : {
        type: Number,
        default : 0,
    },

    currentUpvoteDate: {
        type : String,
    },
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