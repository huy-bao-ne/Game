//This is the main application file for the Express.js server imports routes, and configures middleware.
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { initModels } = require("./models/index-model");

// Import routes
const loginRoutes = require("./routes/user-route");
const scoreRoutes = require("./routes/score-route");
const settingsRoutes = require("./routes/setting-route");
const gameRoutes = require("./routes/game-route");

// Initialize database models
initModels();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/users", loginRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/user/settings", settingsRoutes);
app.use("/api/game", gameRoutes);

module.exports = app;
