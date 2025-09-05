// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// =======================
// ✅ Middleware
// =======================

// Enable CORS for your frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend URL from .env
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // required if sending cookies or JWT
  })
);

// Parse JSON requests
app.use(express.json());

// =======================
// ✅ Database
// =======================
connectDB();

// =======================
// ✅ Routes
// =======================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// ✅ Health check route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// =======================
// ✅ Export app for Vercel
// =======================
module.exports = app;
