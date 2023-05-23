import express from "express";
import { getUserInfo, updateUserInfo, addFollower, getUserFollowers, getUserFollowing } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserInfo);
router.patch("/:id/edit", verifyToken, updateUserInfo);
router.patch("/:id/follow", verifyToken, addFollower);
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/following", verifyToken, getUserFollowing);

export default router;