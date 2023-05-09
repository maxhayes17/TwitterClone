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
// Set directory for assets locally
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// File storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Store files uploaded in public/assets directory
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

// Will use whenever uploading file
const upload = multer({storage});

// Setup DB

// If port doesn't work, set to 6001
const PORT = process.env.PORT || 6001;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`))
}).catch((err) => console.log(err));