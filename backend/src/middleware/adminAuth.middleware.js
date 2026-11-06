// Admin check: only lets the request through if the logged-in user's role is "Admin".
// Must run after verifyUser (it relies on req.user).

export const isAdmin = (req, res, next) => {
    const user = req.user;
    console.log("USER", user);
    if (user.role !== "Admin") {
        return res.status(403).send("Access denied: Admins only");
    }
    next();
};
