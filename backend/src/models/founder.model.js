import mongoose from "mongoose";

const founderSchema = new mongoose.Schema({
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
    previousWorkExperience : [{
        company : {
            type: String,
            required: true,
        },
        role : {                /* Founder */
            type: String,
            required: true,
        },
        year : {
            type: Number,
            required: true,
        }
    }],
    education : {
        type: String,
        required: true,
    },
    skills : {             
        type: String,
        required: true,
    },
    nameOfStartup:{
        type: String,
        required: true,
    },
    goal:{
        type: String,
        required: true,
    },
    description :{
        type: String,
    },
    teamInfo : [{
        tag : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type : String,
        },
        role : {                    /* Team member */
            type : String,  
        }
    }],

    // Founder Account Total Upvotes
    totalUpvotes: {
        type: Number,
        default : 0,
    },
    investorUpvotes: {
        type: Number,
        default : 0,
    },

    posts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
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

    // !! Revisit chatUsers either make here or may be a separate model for it !!

    chatUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    hiddenInfo : {
        sector: {
            type: String,
            required: true,
        },
        fundingStatus: {
            type: String,
            required : true,
        },
        stageOfStartup: {
            type: String,
            required : true,
        },
        socialProof : [{
            type: String,
        }],
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
});

export const Founder = mongoose.model("Founder", founderSchema);