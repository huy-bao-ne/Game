const { getConnection } = require("../config/database.js");

const findUserByUsername = async (username) => {
  const conn = getConnection();
  const [rows] = await conn.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  //return rows[0] || null;
};

const createUser = async (username, password) => {
  const conn = getConnection();
  const [result] = await conn.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password]
  );
  //return { id: result.insertId, username };
};

module.exports = {
  findUserByUsername,
  createUser,
};
