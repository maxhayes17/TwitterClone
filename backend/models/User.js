import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 25
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50
        },
        pw_hash: {
            type: String,
            required: true
        },
        name: {
            type: String,
            max: 50,
            required: true
        },
        bio: {
            type: String,
            max: 160,
            default: "",
        },
        location: {
            type: String,
            max: 30,
        },
        website: {
            type: String,
            max: 100,
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true
        }],
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post" 
        }],
        liked_posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        replies: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
    },
    // Include while debugging
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;