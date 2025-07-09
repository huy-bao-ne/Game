const GameService = require("../services/game-service");

const getState = async (req, res) => {
  try {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).json({ message: "user_id missing" });

    const state = await GameService.getGameState(userId);
    res.json(state || {});
  } catch (err) {
    //console.error("❌ getState error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const saveState = async (req, res) => {
  try {
    const { userId, level, score, lines } = req.body;
    await GameService.saveGameState(userId, level, score, lines);
    res.json({ message: "Game state saved" });
  } catch (err) {
    //console.error("❌ saveState error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getState, saveState };
