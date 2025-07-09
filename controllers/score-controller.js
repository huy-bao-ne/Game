const ScoreService = require("../services/score-service.js");

const saveUserScore = async (req, res) => {
  const { userId, score } = req.body;
  if (!userId || score == null) {
    return res.status(400).json({ message: "userId or score missing" });
  }

  try {
    const scoreId = await ScoreService.saveScore(userId, score);
    res.json({ message: "Score saved!", scoreId });
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const topScores = await ScoreService.getTopScores();
    res.json({ leaderboard: topScores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  saveUserScore,
  getLeaderboard,
};
