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

export const updateUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const {
            name,
            bio,
            location,
            website
        } = req.body;

        user.name = name ? name : user.name;
        user.bio = bio ? bio : user.bio;
        user.location = location ? location : user.location;
        user.website = website ? website : user.website;
        user.save();
        console.log(req.body);

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const addFollower = async (req, res) => {

    try {

        const {
            followerId,
            followeeId
        } = req.body;

        // Add followee to follower's following list
        const follower = await User.findById(followerId);
        follower.following.push(followeeId);
        follower.save();

        // Add follower to followee's following list
        const followee = await User.findById(followeeId);
        followee.followers.push(followerId);
        followee.save()

        // Return followee's data after successful follow
        res.status(200).json({follower: follower, followee: followee});
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}