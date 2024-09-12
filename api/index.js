const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const cors = require('cors');
// Import routes
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");

dotenv.config();

const sequelize = new Sequelize('xipzj0bsyxqk_namphuoc1', 'xipzj0bsyxqk_htung0403', 'gianchun12@', {
  host: 's1002.genhosting.vn',
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => {
    console.log("MySQL is connected");
  })
  .catch((err) => {
    console.error("MySQL connection error:", err);
  });

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://namphuoc1.edu.vn' : 'http://localhost:5173',
  credentials: true, // Allow credentials (cookies) to be sent
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://namphuoc1.edu.vn' : 'http://localhost:5173',
  credentials: true
}));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Define API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });

module.exports = app;