import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({
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
    tagline : {
        type: String,
    },
    skills : {
        type: String,
    },
    education : {
        type: String,
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
        type : String,
    }],
    services : {
        type: String,
    },
    currentAvailability : {
        type: String,
    },
    pricing : {
        type: String,
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

export const Freelancer = mongoose.model("Freelancer", freelancerSchema);