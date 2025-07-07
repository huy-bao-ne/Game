const getConnection = require("../config/database");

const createSettingTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS user_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        is_music_enabled BOOLEAN DEFAULT true,
        music_volume INT DEFAULT 100,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  `;

  try {
    const conn = await getConnection(); // 🟢 Lấy connection từ hàm
    await conn.query(sql);
    // console.log("✅ Bảng đã sẵn sàng!");
  } catch (err) {
    // console.error("❌ Lỗi tạo bảng :", err);
  }
};

module.exports = {
  createSettingTable,
};
