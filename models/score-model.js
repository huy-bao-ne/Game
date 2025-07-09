const getConnection = require("../config/database");

const createScoreTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS scores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      score INT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  try {
    const conn = await getConnection(); // 🟢 Lấy connection từ hàm
    await conn.query(sql);
    // console.log(""");
  } catch (err) {
    // console.error("", err);
  }
};

module.exports = {
  createScoreTable,
};
