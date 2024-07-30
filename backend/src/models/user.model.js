import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    },
    isInvestor : {
        type : Boolean,
        required : true,
    },
    isFounder : {
        type : Boolean,
        required : true,
    },    
    isFreelancer : {
        type : Boolean,
        required : true,
    },
    isCommunityMember : {
        type : Boolean,
        required : true,
    },
    profilePhoto : {
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
            email : this.email,
            isInvestor : this.isInvestor,
            isFounder : this.isFounder,
            isFreelancer : this.isFreelancer,
            isCommunityMember : this.isCommunityMember,
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