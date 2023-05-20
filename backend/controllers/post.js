import Post from "../models/Post.js";
import User from "../models/User.js";


export const getPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({error: err.message});
    } 
}

export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({author: id});
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const createPost = async (req, res) => {
    try {
        console.log(req.body);
        const {
            author,
            body,
            audience
        } = req.body;


        const newPost = new Post({
            author: author,
            body: body,
            public: audience == "Everyone"
        });
        newPost.date = newPost.createdAt;


        // Find user who has created this post, and add post to their collection
        const user = await User.findById(author);
        user.posts.push(newPost._id);
        await user.save();
        
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}