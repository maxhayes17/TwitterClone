import express from "express"; // Backend framework
import bodyParser from "body-parser";
import mongoose from "mongoose"; // Database
import cors from "cors"; // CORS requests
import dotenv from "dotenv"; // Venv
import multer from "multer"; // File upload
import helmet from "helmet"; // HTTP Response headers
import morgan from "morgan"; // HTTP Request logger
import path from "path"; // File, directory paths
import { fileURLToPath } from "url"; // File path

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js"; // Routes for authentication/authorization
import postRoutes from "./routes/post.js";

import { updateUserInfo } from "./controllers/user.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import {users, posts} from "./data.js"; // Sample data

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Init venv
dotenv.config();
// Init express application
const app = express();
// Middleware to be used with app
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

app.use(cors());
// Set directory for uploads locally
app.use("/uploads", express.static(path.join(__dirname, 'public/uploads')));

// File storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Store files uploaded in public/uploads directory
        cb(null, "public/uploads");
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});

// Will use whenever uploading file
const upload = multer({storage});

// Routes with file upload

// Edit user profile
app.patch("/user/:id/edit", verifyToken, upload.single('file'), updateUserInfo);

// Create post
app.post("/posts/compose", verifyToken, upload.single('file'), createPost);


// Authentication routes
app.use("/auth", authRoutes);

// User information routes
app.use("/user", userRoutes);

// Post routes
app.use("/posts", postRoutes);


// Setup DB

// If port doesn't work, set to 6001
const PORT = process.env.PORT || 6001;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`))

    // ADD DATA - Only do this ONCE; comment out after
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((err) => console.log(err));