import jwt from 'jsonwebtoken';

// Will use this middleware for verifying user for different routes
export const verifyToken = async(req, res, next) => {
    try {
        // Grab authorization header set from frontend
        let token = req.header("Authorization");
        // If token does not exists, throw failing status code
        if (!token) return res.status(403).send("Access Denied");

        // If token has Bearer in beginning... trim token string to contain everything afterwards
        if (token.startsWith("Bearer "))
            token = token.slice(7, token.length).trimLeft();
        // Compare token
        const isVerified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = isVerified;
        next();
    } catch (err) {
        res.status(500).json({error: err.message})
    }
};