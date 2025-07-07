const getConnection = require("../config/database");

const saveScore = async (userId, score) => {
  const conn = await getConnection();
  // ⛔ Lưu ý: getConnection KHÔNG phải là một connection object!
  // 👉 Nó là một hàm async trả về connection, nên PHẢI dùng:
  //    const conn = await getConnection();
  //    rồi mới được: await conn.query(...)
  // Nếu dùng getConnection.query(...) là lỗi liền!

  const [result] = await conn.query(
    "INSERT INTO scores (user_id, score) VALUES (?, ?)",
    // userId và score nhận từ frontend
    [userId, score]
  );
  // result là một object chứa thông tin về kết quả của câu lệnh INSERT
  // Ví dụ: { insertId: 123, affectedRows: 1, changedRows: 0, warningStatus: 0 }
  // Chúng ta chỉ cần lấy insertId để biết ID của bản ghi mới được tạo
  // insertId là ID của bản ghi
  // affectedRows là số lượng bản ghi bị ảnh hưởng (thường là 1 nếu thành công)
  // changedRows là số lượng bản ghi đã thay đổi (thường là 0 với INSERT)
  // warningStatus là trạng thái cảnh báo (thường là 0 nếu không có cảnh báo)
  // Chúng ta có thể trả về insertId để biết ID của bản ghi mới được created
  // return result.insertId;
};

const getTopScores = async (limit = 5) => {
  // ⛔ Lưu ý: getConnection KHÔNG phải là một connection object!
  // 👉 Nó là một hàm async trả về connection, nên PHẢI dùng:
  //    const conn = await getConnection();
  //    rồi mới được: await conn.query(...)
  // Nếu dùng getConnection.query(...) là lỗi liền!
  const conn = await getConnection();
  const [result] = await conn.query(
    `SELECT users.username, scores.score, scores.created_at
     FROM scores
     JOIN users ON scores.user_id = users.id
     ORDER BY score DESC, scores.created_at ASC
     LIMIT ?`,
    [limit]
  );
  // result là một mảng các object, mỗi object chứa thông tin về người dùng và điểm số
  // Ví dụ: [
  //   { username: 'user1', score: 100, created_at: '2023-10-01 12:00:00' },
  //   { username: 'user2', score: 90, created_at: '2023-10-01 12:05:00' },
  //   ...
  // ]
  // Chúng ta có thể trả về mảng này để biết điểm số cao nhất
  // và thông tin người dùng tương ứng

  // return result;
  //   => Sau này nếu mày muốn:

  // Hiển thị ID điểm vừa tạo

  // Log ra để debug

  // Gửi kèm về frontend

  // Tạo một bản ghi khác phụ thuộc vào điểm này
  // ==> Lúc đó cái return này là cứu tinh 💪
};

module.exports = {
  saveScore,
  getTopScores,
};
