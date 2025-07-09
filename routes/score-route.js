const express = require("express");
const router = express.Router();
const {
  saveUserScore,
  getLeaderboard,
} = require("../controllers/score-controller");

// Route to save user score
router.post("/save", saveUserScore);

// Route to get the leaderboard
router.get("/leaderboard", getLeaderboard);

module.exports = router;
