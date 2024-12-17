import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({

    fullName : {
        type: String,
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
        unique : true,
    },
    previousExperience : {
        type : Number,
        required: true,
    },
    areaOfInterest : [{
        type : String,
        required: true,
    }],
    // Index is the hash of the original Pan card
    panCard : {
        index: { type: String, required: true },
        // Below is the encrypted Pan card information
        pan: {
            iv: { type: String, required: true },
            data: { type: String, required: true },
        }
    },
    startupStage : {
        type : String,
        required: true,
    },
    preferredSector : {
        type : String,
        required: true,
    },
    investmentRange : {
        type : Number,
        required: true,
    },
    linkedInUrl : {
        type: String,
    },
    websiteUrl : {
        type: String,
    },
    domainEmail : {
        type: String,
    },
    panCardPhoto : {
        type : String,
    },

    requestedFounders : [{
        founder : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        requestDate : {
            type : Date,
            default : Date.now,
        }
    }],

    chatUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
},{timestamps : true});

export const Investor = mongoose.model("Investor", investorSchema);