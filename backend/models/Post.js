import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        author: String,
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
        likes: Number,
        comments: [{ author: String, body: String, date: Date }],
    }
);