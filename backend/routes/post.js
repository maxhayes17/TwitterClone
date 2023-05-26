import express from "express";

import { getPosts, createPost, createReply, addLike, getPostInfo, getPostReplies, getPostLikes } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


// Get ALL posts
router.get("/", verifyToken, getPosts);


// Individual post info
router.get("/:id", verifyToken, getPostInfo);
router.get("/:id/replies", verifyToken, getPostReplies);
router.get("/:id/likes", verifyToken, getPostLikes)

// Create post / Create reply
router.post("/compose", verifyToken, createPost);
router.post("/:id/reply", verifyToken, createReply);

// Like post
router.patch("/:id/like", verifyToken, addLike);

export default router;