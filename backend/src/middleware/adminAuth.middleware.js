export const isAdmin = (req, res, next) => {
    const user = req.user;
    console.log("USER", user);
    if (user.role !== 'Admin') {
        return res.status(403).send('Access denied: Admins only');
    }
    next();
};
