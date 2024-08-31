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
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
});

export const Freelancer = mongoose.model("Freelancer", freelancerSchema);