import User from "../models/User.js"

export const getUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        // Find user by provided id, and return object
        const user = await User.findById(id);
        console.log(user.email);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}