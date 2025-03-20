import passport from "passport";
import { User } from "../models/user.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {
            clientID : process.env.GOOGLE_CLIENT_ID,            /* Not added yet */
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,    /* Not added yet */
            callbackURL : "/auth/google/callback",              /* Not added yet */
        },
        async (accessToken, refreshToken, profile, done) => {
            try{
                const user = await User.findOne({googleId : profile.id});
                if(!user){
                    user = await User.create({
                        googleId : profile.id,
                        email : profile.emails[0].value,
                        profilePhoto : profile.photos[0].value,
                        refreshToken,
                    })
                }
                return done(null. user);
            }
            catch(error){
                return done(error, false);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
})