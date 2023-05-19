import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        public: Boolean,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        body: {
            type: String,
            min: 1,
            max: 400
        },
        date: {
            type: Date,
            default: Date.now
        },
        tags: [{tag: String}],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        comments: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        media: Boolean
    },
    // Include while debugging
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
export default Post;