const getConnection = require("../config/database");

const saveScore = async (userId, score) => {
  const conn = await getConnection();

  const [result] = await conn.query(
    "INSERT INTO scores (user_id, score) VALUES (?, ?)",

    [userId, score]
  );
};

const getTopScores = async (limit = 5) => {
  const conn = await getConnection();
  const [result] = await conn.query(
    `SELECT users.username, scores.score, scores.created_at
     FROM scores
     JOIN users ON scores.user_id = users.id
     ORDER BY score DESC, scores.created_at ASC
     LIMIT ?`,
    [limit]
  );
};

module.exports = {
  saveScore,
  getTopScores,
};
