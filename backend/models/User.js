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
            max: 50
        },
        bio: {
            type: String,
            max: 160
        },
        location: {
            type: String,
            max: 30
        },
        website: {
            type: String,
            max: 100
        },
        followers: [{
            type: ObjectId,
            ref: "User", 
            required: true
        }],
        following: [{
            type: ObjectId,
            ref: "User", 
            required: true
        }],

        // posts: [{
        //     author: String, 
        //     body: String, 
        //     date: Date, 
        //     tags: [{tag: String}],  
        //     likes: Number,
        //     comments: [{ author: String, body: String, date: Date }]
        // }],
        // liked_posts: [{
        //     author: String, 
        //     body: String, 
        //     date: Date, 
        //     tags: [{tag: String}],
        //     likes: Number,  
        //     comments: [{ author: String, body: String, date: Date }]
        // }],
    },
    // Include while debugging
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;