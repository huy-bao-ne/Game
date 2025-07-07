const getConnection = require("../config/database");

const getGameState = async (userId) => {
  const conn = await getConnection();
  const [rows] = await conn.query(
    "SELECT * FROM game_state WHERE user_id = ?",
    [userId]
  );
  return rows[0] || null;
};

const saveGameState = async (userId, level, score, lines) => {
  const conn = await getConnection();
  await conn.query(
    `INSERT INTO game_state (user_id, game_level, score, achieved_lines)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE game_level = ?, score = ?, achieved_lines = ?, updated_at = CURRENT_TIMESTAMP`,
    [userId, level, score, lines, level, score, lines]
  );
};

module.exports = { getGameState, saveGameState };
