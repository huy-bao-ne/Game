// controllers/user-settings-controller.js
const {
  getUserSettings,
  updateUserSettings,
} = require("../services/setting-service");

const getSettings = async (req, res) => {
  try {
    //Khi đăng nhập xong fetch đến http://localhost:3000/api/user/settings?user_id=1
    //để lấy dữ liệu đã lưu trong bảng user_settings
    const userId = req.query.user_id; // 👈 hoặc dùng từ token sau này
    const settings = await getUserSettings(userId);
    //console.log("📦 settings found:", settings);
    res.json(settings);
  } catch (err) {
    console.error("❌ Lỗi getSettings:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { userId, musicEnabled, musicVolume } = req.body;
    const settings = await updateUserSettings(
      userId,
      musicEnabled,
      musicVolume
    );
    res.json({ message: "Settings updated", settings });
  } catch (err) {
    console.error("❌ Lỗi updateSettings:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSettings, updateSettings };

// try {
//   const userId = req.query.user_id; // 🟢 Lấy từ query string
//   if (!userId) return res.status(400).json({ message: "Thiếu user_id" });

//   const conn = await getConnection();
//   const [rows] = await conn.query(
//     "SELECT * FROM user_settings WHERE user_id = ?",
//     [userId]
//   );

//   if (rows.length === 0)
//     return res.status(404).json({ message: "Không tìm thấy cài đặt" });

//   res.json(rows[0]);
// } catch (error) {
//   console.error("❌ getSettings error:", error);
//   res.status(500).json({ message: "Lỗi server" });
// }
