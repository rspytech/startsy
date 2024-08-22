import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({
    contactInfo : {
        type: String,
        required: true,
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
    panCardPhoto : {
        type : String,
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
},{timestamps : true});

export const Investor = mongoose.model("Investor", investorSchema);