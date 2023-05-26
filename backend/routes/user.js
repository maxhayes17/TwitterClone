import express from "express";
import { getUserInfo, updateUserInfo, addFollower, getUserFollowers, getUserFollowing, getUserPosts } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Edit user profile
router.patch("/:id/edit", verifyToken, updateUserInfo);

// Add follower
router.patch("/:id/follow", verifyToken, addFollower);

// Get user info
router.get("/:id", verifyToken, getUserInfo);

// Get user's posts
router.get("/:id/posts", verifyToken, getUserPosts);

// Get followers / following
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/following", verifyToken, getUserFollowing);

export default router;