const { getConnection } = require("../config/database.js");

const findUserByUsername = async (username) => {
  // ⛔ Lưu ý: getConnection KHÔNG phải là một connection object!
  // 👉 Nó là một hàm async trả về connection, nên PHẢI dùng:
  //    const conn = await getConnection();
  //    rồi mới được: await conn.query(...)
  // Nếu dùng getConnection.query(...) là lỗi liền!
  const conn = getConnection();
  const [rows] = await conn.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  //return rows[0] || null;
};

const createUser = async (username, password) => {
  // ⛔ Lưu ý: getConnection KHÔNG phải là một connection object!
  // 👉 Nó là một hàm async trả về connection, nên PHẢI dùng:
  //    const conn = await getConnection();
  //    rồi mới được: await conn.query(...)
  // Nếu dùng getConnection.query(...) là lỗi liền!
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
