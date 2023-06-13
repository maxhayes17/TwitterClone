import User from "../models/User.js"
import Post from "../models/Post.js";


export const getUsers = async (req, res) => {
    try {

        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}


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

        const follower = await User.findById(followerId);
        const followee = await User.findById(followeeId);

        // If follower already follows followee and clicks this... unfollow
        if (follower.following.includes(followeeId)){
            follower.following = follower.following.filter((id) => id != followeeId);
            followee.followers = followee.followers.filter((id) => id != followerId);
        }
        else {
            // Otherwise, add follower to followee's followers...
            follower.following.push(followeeId);
            followee.followers.push(followerId);

        }
        follower.save();
        followee.save()

        // Return followee's data after successful follow
        res.status(200).json({follower: follower, followee: followee});
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        // Sort by descending date
        const posts = await Post.find({author: id}).sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getUserReplies = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        const replies = await Promise.all(
            user.replies.map((id) => Post.findById(id))
        )
        // Sort replies by date
        replies.sort((a,b) => b.createdAt - a.createdAt);

        res.status(200).json(replies);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getUserLiked = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        const liked_posts = await Promise.all(
            user.liked_posts.map((id) => Post.findById(id))
        )
        // Sort posts by date
        liked_posts.sort((a,b) => b.createdAt - a.createdAt);

        res.status(200).json(liked_posts);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}


export const getUserFollowers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        const followers = await Promise.all(
            user.followers.map((id) => User.findById(id))
        );

        res.status(200).json({user: user, follows: followers});
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getUserFollowing = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        const following = await Promise.all(
            user.following.map((id) => User.findById(id))
        );

        res.status(200).json({user: user, follows: following});
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getUserFeed = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);


        // Will create of posts for each user followed... will have to un-nest these elements
        const posts = await Promise.all(
            user.following.map((id) => Post.find({author: id}))
        )

        // Use .flat() to un-nest array elements, and sort by date

        const feed = await posts.flat().sort((a,b) => b.createdAt - a.createdAt)
        res.status(200).json(feed);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}