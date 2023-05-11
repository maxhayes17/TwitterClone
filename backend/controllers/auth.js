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
}
