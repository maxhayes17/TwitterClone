import Post from "../models/Post.js";
import User from "../models/User.js";

export const getPostInfo = async(req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getPosts = async (req, res) => {
    try {
        // Sort by descending date
        const posts = await Post.find().sort({createdAt: -1});
        res.status(200).json(posts);
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

export const createReply = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            author,
            body
        } = req.body;

        const reply = new Post({
            author: author,
            body: body,
            root: id
        });
        // Add reply to post's replies
        const rootPost = await Post.findById(id);
        rootPost.replies.push(reply._id);

        // Add reply to author's replies
        const replyAuthor = await User.findById(author);
        replyAuthor.replies.push(reply._id);
        
        res.status(200).json(rootPost);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}