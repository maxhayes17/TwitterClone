import express from "express";

import { getPosts, createReply, addLike, getPostInfo, getPostReplies, getPostLikes, getPostsWithTag } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


// Get ALL posts
router.get("/", verifyToken, getPosts);

// Get all posts with a certain tag
router.get("/tags/:tag", verifyToken, getPostsWithTag);


// Individual post info
router.get("/:id", verifyToken, getPostInfo);
router.get("/:id/replies", verifyToken, getPostReplies);
router.get("/:id/likes", verifyToken, getPostLikes)

// Create reply
router.post("/:id/reply", verifyToken, createReply);

// Like post
router.patch("/:id/like", verifyToken, addLike);

export default router;