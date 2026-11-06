// URLs under /auth: Google sign-in.
// Note: the Google login setup in config/passport.js is never loaded, so these routes
// cannot complete a Google login as the code stands.

import { Router } from "express";
import passport from "passport";

const router = Router();

router.route("/google/callback").get(
    passport.authenticate("google", {
        failureRedirect: "/login" /* Frontend route path */,
    }),
    (req, res) => {
        res.redirect("/"); /* Frontend route path */
    }
);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

export default router;
