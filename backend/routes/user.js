import express from "express";
import { getUserInfo } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserInfo);

export default router;