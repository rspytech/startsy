import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({

    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    country: {
        type: String,
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
    },


    contactInfo: {
        type: String,
        unique: true,
    },
    previousExperience: {
        type: Number,
        required: true,
    },
    // Index is the hash of the original Pan card
    panCard: {
        index: { type: String, required: true },
        // Below is the encrypted Pan card information
        pan: {
            iv: { type: String, required: true },
            data: { type: String, required: true },
        }
    },
    investorType: {
        type: String,
    },
    startupStage: {
        type: String,
        required: true,
    },
    preferredSector: {
        type: String,
        required: true,
    },
    investmentRange: {
        type: Number,
        required: true,
    },
    linkedInUrl: {
        type: String,
    },
    websiteUrl: {
        type: String,
    },
    domainEmail: {
        type: String,
    },
    panCardPhoto: {
        type: String,
    },


    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

    requestedFounders: [{
        founder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        requestDate: {
            type: Date,
            default: Date.now,
        }
    }],

    chatUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

export const Investor = mongoose.model("Investor", investorSchema);