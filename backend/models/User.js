import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 25,
            unique: true
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        pw_hash: {
            type: String,
            required: true
        },
        posts: [{
            author: String, 
            body: String, 
            date: Date, 
            tags: [{tag: String}],  
            likes: Number,
            comments: [{ author: String, body: String, date: Date }]
        }],
        liked_posts: [{
            author: String, 
            body: String, 
            date: Date, 
            tags: [{tag: String}],
            likes: Number,  
            comments: [{ author: String, body: String, date: Date }]
        }],
    }
);