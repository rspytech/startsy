import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({
    // Contact Info should be number or String?? Mobile Number 
    contactInfo : {
        type: String,
        required: true,
    },
    previousExperience : {
        type : Number,
        required: true,
    },
    // Area of Interest should be array right?? we are storing list of interests like tags
    areaOfInterest : {
        type : String,
        required: true,
    },
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
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    // I dont think we need this Connections field here.
    // connections : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'Connection',
    // }
},{timestamps : true});

export const Investor = mongoose.model("Investor", investorSchema);