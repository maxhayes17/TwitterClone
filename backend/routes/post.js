import express from "express";

import { getPosts, createPost, getUserPosts, getPostInfo } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getPosts);
router.get("/:id/posts", verifyToken, getUserPosts);
router.get("/:id", verifyToken, getPostInfo);
router.post("/compose", verifyToken, createPost);

export default router;