// controllers/user-settings-controller.js
const {
  getUserSettings,
  updateUserSettings,
} = require("../services/setting-service");

const getSettings = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const settings = await getUserSettings(userId);
    //console.log("settings found:", settings);
    res.json(settings);
  } catch (err) {
    //console.error("❌ getSettings:", err);
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
    //console.error("❌ Lỗi updateSettings:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSettings, updateSettings };
