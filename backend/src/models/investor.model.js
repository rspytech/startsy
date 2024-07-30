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
    areaOfInterest : {
        type : String,
        required: true,
    },
    panCard : {
        type : String,
        unique : true,
        required: true,
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
    connections : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Connection',
    }
},{timestamps : true});

export const Investor = mongoose.model("Investor", investorSchema);