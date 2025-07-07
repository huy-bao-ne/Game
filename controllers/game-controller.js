const GameService = require("../services/game-service");

const getState = async (req, res) => {
  try {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).json({ message: "Thiếu user_id" });

    const state = await GameService.getGameState(userId);
    res.json(state || {});
  } catch (err) {
    console.error("❌ Lỗi getState:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const saveState = async (req, res) => {
  try {
    const { userId, level, score, lines } = req.body;
    await GameService.saveGameState(userId, level, score, lines);
    res.json({ message: "Game state saved" });
  } catch (err) {
    console.error("❌ Lỗi saveState:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getState, saveState };
