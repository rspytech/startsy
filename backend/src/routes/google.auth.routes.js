import { Router } from "express";
import passport from "passport";

const router = Router();

router.route("/google/callback").get(
    passport.authenticate("google",
        {
            failureRedirect : "/login"     /* Frontend route path */
        }
    ), (req, res) => {
        res.redirect("/");                 /* Frontend route path */
    }
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

export default router;