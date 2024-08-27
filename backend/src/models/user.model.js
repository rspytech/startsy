import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
    },
    email:{
        type : String,
        unique : true,
        lowercase : true,
    },
    contactInfo : {
        type: String,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type: String,
        enum: ['Investor', 'Founder', 'Freelancer', 'Community Member'],
        default: 'Community Member'
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