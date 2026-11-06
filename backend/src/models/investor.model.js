import mongoose from "mongoose";

const investorSchema = new mongoose.Schema(
    {
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
            required: false, // Set required only if necessary for all types
        },
        previousExperience: {
            type: Number,
        },
        previousWorkExperience: [
            {
                company: {
                    type: String,
                },
                role: {
                    type: String,
                },
                year: {
                    type: Number,
                },
            },
        ],
        education: {
            type: String,
        },
        skills: {
            type: String,
        },
        nameOfStartup: {
            type: String,
        },
        goal: {
            type: String,
        },
        description: {
            type: String,
        },
        teamInfo: [
            {
                tag: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                name: {
                    type: String,
                },
                role: {
                    type: String,
                },
            },
        ],
        totalUpvotes: {
            type: Number,
            default: 0,
        },
        upvotesPerDay: {
            type: Number,
            default: 0,
        },
        currentUpvoteDate: {
            type: String,
        },
        investorUpvotes: {
            type: Number,
            default: 0,
        },
        investorType: {
            type: String,
        },
        startupStage: {
            type: String,
        },
        preferredSector: {
            type: String,
        },
        investmentRange: {
            type: Number,
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
        panCard: {
            index: { type: String },
            pan: {
                iv: { type: String },
                data: { type: String },
            },
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        requestedFounders: [
            {
                founder: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                requestDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        requestNotifications: [
            {
                investor: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                requestDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        chatUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        hiddenInfo: {
            sector: {
                type: String,
            },
            fundingStatus: {
                type: String,
            },
            stageOfStartup: {
                type: String,
            },
            socialProof: [
                {
                    name: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        },
        recommendationId: {
            type: String,
        },
        investorConnections: {
            type: Number,
            default: 0,
        },
        communityMemberRole: {
            type: String,
        },
        areaOfInterest: {
            type: String,
        },
        contentPrefrence: {
            type: String,
        },
        tagline: {
            type: String,
        },
        certification: [
            {
                name: {
                    type: String,
                },
                url: {
                    type: String,
                },
            },
        ],
        portfolio: [
            {
                name: {
                    type: String,
                },
                url: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

export const Investor = mongoose.model("Investor", investorSchema);
