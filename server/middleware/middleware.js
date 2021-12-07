const jwt = require("jsonwebtoken");

exports.requireSignIn = (req, res, next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.decode(token, process.env.JWT_SECRET);
        req.user = user;
    }
    else 
        return res.status(400).json("Authorization Error");
    next();
}

exports.buyerMiddleware = (req, res, next) => {
    if(req.user.role !== "buyer") {
        return res.status(400).json("Access Denied");
    }
    next();
}

exports.sellerMiddleware = (req, res, next) => {
    if(req.user.role !== "seller") {
        return res.status(400).json("Access Denied");
    }
    next();
}