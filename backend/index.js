import express from 'express';
import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
import UserRoute from './Routes/UserRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ProductRoute from './Routes/ProductRoute.js';

dotenvConfig();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use(cookieParser());


app.use(cors({
    origin: ["http://localhost:5173","https://aqua-sleri.vercel.app/*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// route for user login 
app.use('/api/users', UserRoute);
app.use('/api/admin', ProductRoute);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server after successfully connecting to MongoDB
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
