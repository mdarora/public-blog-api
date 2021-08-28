const logoutAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        return res.json({error: "Already loggedin"});
    }
    next();
}

module.exports = logoutAuth;