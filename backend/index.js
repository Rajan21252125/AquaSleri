import express from 'express';
import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
import UserRoute from './Routes/UserRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ProductRoute from './Routes/ProductRoute.js';
import CartRoutes from './Routes/CartRoutes.js';
import feedBackRoute from './Routes/feedBackRoute.js';
import cron from 'node-cron';
import User from './Schema/UserSchema.js';
import PaymentRoute from './Routes/PaymentRoute.js';
import OrderRoute from './Routes/orderRoutes.js'




dotenvConfig();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "https://aquasleri.stranger2125.me"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Define routes
app.use('/api/users', UserRoute);
app.use('/api/admin', ProductRoute);
app.use('/api/cart', CartRoutes);
app.use('/api/feedback', feedBackRoute);
app.use('/api/payment', PaymentRoute);
app.use('/api/order', OrderRoute);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        // Define a cron job
        cron.schedule('0 0 * * *', async () => {
            try {
                const fiveDaysAgo = new Date();
                fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

                // Find users who have not been verified and were created more than 5 days ago
                const usersToRemove = await User.find({
                    verified: false,
                    createdAt: { $lte: fiveDaysAgo }
                });

                // Remove users
                await User.deleteMany({
                    verified: false,
                    createdAt: { $lte: fiveDaysAgo }
                });

                console.log(`Removed ${usersToRemove.length} users who were not verified within 5 days.`);
            } catch (error) {
                console.error('Error removing users:', error);
            }
        });

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

// Root path handler
app.get("/", (req, res) => {
    res.send("Hello World");
});
