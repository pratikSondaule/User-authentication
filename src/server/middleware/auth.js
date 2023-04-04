const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    try {

        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const verifyToken = jwt.verify(token, "sothisisasecretkeyformernproject");
            req.user = verifyToken
            next();

        } else {
            res.status(400).json({message: "Unauthorised token"});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = auth;