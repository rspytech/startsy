import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    googleId : {                /* For google log in */
        type: String,
    },
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
    userName : {
        type : String,
    },
    email:{
        type : String,
        lowercase : true,
    },
    contactInfo : {
        type: String,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type: String,
        enum: ['Admin', 'Investor', 'Founder', 'Freelancer', 'CommunityMember'],
        default: 'CommunityMember'
    },
    profilePhoto : {
        type : String,
    },
    /* To connect from user model to the specific userType model */
    roleId : {                      
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'role',
    },
    communityList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    }],
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    following: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    newslettersPosted : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Newsletter",
    }],
    bannerImage : {
        type : String,
    },
    refreshToken : {
        type : String,
    }
},{timestamps : true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))  return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            userName : this.userName,
            // email : this.email,
            role : this.role,
        },
            process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
            process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = new mongoose.model("User", userSchema);