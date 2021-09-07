const jwt = require('jsonwebtoken');

const loginAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({error: "Login first."});
    }
    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        req.id = verifyToken.id;
        req.name = verifyToken.name;
        req.username = verifyToken.username;
        next();
    } catch (error) {
        console.log("Catched at loginAuth: ", error);
        res.json({error: "Login first."});
    }
}

module.exports = loginAuth;