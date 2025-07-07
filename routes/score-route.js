const express = require("express");
const router = express.Router();
const { saveUserScore, getLeaderboard } = require("../controllers/score-controller");

// This file defines the routes for user score management
// Route to save user score
router.post("/save", saveUserScore);

// Route to get the leaderboard
router.get("/leaderboard", getLeaderboard);

module.exports = router;
