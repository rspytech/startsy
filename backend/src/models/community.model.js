import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    communityName : {
        type: String,
    },
    communityDescription : {
        type: String,
    },
    communityRules : {
        type: String,
    },
    communityMembers : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    communityAdmin : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    groupPhoto : {
        type : String,
    },
    isLock : {
        type: Boolean,
        default: false,
    }

});

export const Community = mongoose.model('Community', communitySchema);