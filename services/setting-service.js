const getConnection = require("../config/database");
//Nhớ kiểm tra các trường và cột xem trong bảng `user_settings` đã được tạo trong cơ sở dữ liệu hay chưa.
//Có đúng tên hay không

const getUserSettings = async (userId) => {
  const conn = await getConnection();
  const [rows] = await conn.query(
    "SELECT * FROM user_settings WHERE user_id = ?",
    [userId]
  );
  return rows[0] || {};
};

const updateUserSettings = async (userId, musicEnabled, musicVolume) => {
  const conn = await getConnection();
  await conn.query(
    //Kiểm tra lại tên xem có đúng hay không?
    `INSERT INTO user_settings (user_id, is_music_enabled, music_volume)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE is_music_enabled = ?, music_volume = ?`,
    [userId, musicEnabled, musicVolume, musicEnabled, musicVolume]
  );
};

module.exports = { getUserSettings, updateUserSettings };
