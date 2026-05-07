const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(authMiddleware);

// Routes
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Mobile Store API is running");
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/mobileStore")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});