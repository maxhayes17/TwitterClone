import express from "express";
import { getUserInfo, updateUserInfo, addFollower } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserInfo);
router.patch("/:id/edit", verifyToken, updateUserInfo);
router.patch("/:id/follow", verifyToken, addFollower);

export default router;