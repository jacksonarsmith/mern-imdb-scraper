const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: "Token is required for authentication" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            } else {
                const user = await User.findById(decoded._id);
                
                if (user) {
                    req.user = user;
                    next(); 
                } else {
                    return res.status(401).json({ message: "Invalid token" });
                }
            }
        });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};