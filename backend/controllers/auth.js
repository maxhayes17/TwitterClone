import bcrypt from "bcrypt"; // Password encryption
import jwt from "jsonwebtoken"; // Web-token to be used for authorization
import User from "../models/User.js"; // User DB model

// Must be async when making calls to DB
export const register = async(req, res) => {
    try {
        // De-structure request body
        const {
            username,
            email,
            password
        } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt();
        const pw_hash = await bcrypt.hash(password, salt);

        // Create new user object with credentials passed in
        const newUser = new User({
            username,
            email,
            pw_hash
        });
        const savedUser = await newUser.save();
        // Send successful (Resource created) response
        res.status(201).json(savedUser);

    } catch (err) {
        // Send unsuccessful status code with error message if error occurs
        res.status(500).json({error: err.message})
    }
};

export const login = async(req, res) => {
    try {
        // De-structure request body
        const {
            email,
            password
        } = req.body;
        
        // Search DB for user with unique email
        const user = User.findOne({email: email});

        // If user does not exist, or incorrect password was entered, return 400 (Client error) status code
        if (!user || !(await bcrypt.compare(password, user.password))) 
            return res.status(400);

        // Otherwise... User exists and has logged in with correct credentials
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        // Remove password from user object so it is not included to response
        delete user.pw_hash;
        res.status(200).json({token, user})
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
