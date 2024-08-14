import mongoose from "mongoose";

const founderSchema = new mongoose.model({
    contactInfo : {
        type: String,
        required: true,
    },
    // name : {                 /* According to UI Decision to be taken */
    //     type : String,
    //     required: true,
    // },
    previousWorkExperience : {
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
    },
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
    teamInfo : [{
        tag : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type : String,
            required: true,
        },
        role : {                    /* Team member */
            type : String,  
            required: true,
        }
    }],
    hiddenInfo : {
        targetAudience:{ 
            type: String,
            required: true,
        },
        timeline : {
            type: String,
            required: true,
        },
        sector: {
            type: String,
            enum: ['Horizontal', 'Vertical'],
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