const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

// Routes
const authRoutes = require("./routes/authRoutes");

// Load env variables
dotenv.config();

// Create app
const app = express();


// ======================
// MIDDLEWARE
// ======================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// ======================
// DATABASE CONNECTION
// ======================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });


// ======================
// ROUTES
// ======================

app.get("/", (req, res) => {
  res.json({ message: "Amazon Clone API Running 🚀" });
});

app.use("/api/auth", authRoutes);


// ======================
// 404 HANDLER
// ======================

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});


// ======================
// GLOBAL ERROR HANDLER
// ======================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});


// ======================
// SERVER LISTEN
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});