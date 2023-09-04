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
        date: Date,
        tags: [{type: String}],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        replies: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        picture_path: {
            type: String
        },
        root: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    // Include while debugging
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
export default Post;