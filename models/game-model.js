const getConnection = require("../config/database");

const createGameStateTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS game_state (
    user_id INT PRIMARY KEY,
    game_level INT DEFAULT 1,
    score INT DEFAULT 0,
    achieved_lines INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  `;
  try {
    const conn = await getConnection(); // 🟢 Lấy connection từ hàm
    await conn.query(sql);
    //console.log(");
  } catch (err) {
    //console.error("", err);
  }
};

module.exports = {
  createGameStateTable,
};
