import express from "express";
import { getUserInfo, addFollower, getUserFollowers, getUserFollowing, getUserPosts, getUserReplies, getUserLiked, getUserMedia, getUserFeed, getUsers } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get ALL users
router.get("/", verifyToken, getUsers);

// Add follower
router.patch("/:id/follow", verifyToken, addFollower);

// Get user info
router.get("/:id", verifyToken, getUserInfo);

// Get user's feed (posts from followers)
router.get("/:id/feed", verifyToken, getUserFeed);

// Get user's posts / replies / liked posts / media
router.get("/:id/posts", verifyToken, getUserPosts);
router.get("/:id/replies", verifyToken, getUserReplies);
router.get("/:id/liked", verifyToken, getUserLiked);
router.get("/:id/media", verifyToken, getUserMedia)
// Get followers / following
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/following", verifyToken, getUserFollowing);

export default router;