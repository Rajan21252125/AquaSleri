const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;


// port listening
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});



// basic route
app.get("/", (req, res) => {
    res.send("Hello World");
})


// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
