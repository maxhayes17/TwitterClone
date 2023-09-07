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
        // Sort (public posts) by descending date
        const posts = await Post.find({public:true}).sort({createdAt: -1});

        // Filter replies out
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({error: err.message});
    } 
}

export const getPostsWithTag = async (req, res) => {
    try {
        const { tag } = req.params;

        // Find all posts containing tag, sort by descending date
        const posts = await Post.find({tags:tag}).sort({createdAt: -1});

        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({error: err.message});
    } 
}

export const createPost = async (req, res) => {
    try {
        // De-structure body
        const {
            author,
            body,
            audience,
            picture_path
        } = req.body;

        // Create array of all words in posts which are hashtags (denoted with #)
        const words = body.split(' ');
        const tags = words.filter((word) => word.startsWith('#'));
        // Remove '#' from each tag, this will become tag array
        const trimmedTags = tags.map((tag) => tag.substring(1));

        const newPost = new Post({
            author: author,
            body: body,
            public: audience == "Everyone",
            tags: trimmedTags,
            picture_path: picture_path ? picture_path : ""
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

        // De-structure body
        const {
            author,
            body
        } = req.body;

        // Create new post as reply
        const reply = new Post({
            author: author,
            body: body,
            root: id
        });

        await reply.save();

        // Add reply to post's replies
        const rootPost = await Post.findById(id);
        rootPost.replies.push(reply._id);

        await rootPost.save();

        // Add reply to author's replies
        const replyAuthor = await User.findById(author);
        replyAuthor.replies.push(reply._id);

        await replyAuthor.save();

        res.status(200).json(rootPost);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const addLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

    
        const post = await Post.findById(id);
        const user = await User.findById(userId);

        // If the user has already liked the post, unlike
        if (post.likes.includes(userId)){
            post.likes = post.likes.filter((id) => id != userId);
            // Remove post from user's liked posts
            user.liked_posts = user.liked_posts.filter((postId) => postId != id);
        }
        else {
            // Add user to post's likes
            post.likes.push(userId);
            // Add post to user's liked_posts
            user.liked_posts.push(id);
        }
    
        await post.save();
        await user.save();

        res.status(200).json({user: user, post: post});
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getPostReplies = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Sort replies by descending date
        const replies = await Post.find({root: id}).sort({createdAt: -1});
        res.status(200).json(replies);
    } catch (err) {
        res.status(404).json({error: err.message});
    } 
}

export const getPostLikes = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json();
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}