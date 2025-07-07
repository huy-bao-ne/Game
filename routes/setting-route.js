const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/user-settings-controller");

// GET /api/user/settings?user_id=1
router.get("/", settingsController.getSettings);

// PUT /api/user/settings
router.put("/", settingsController.updateSettings);

module.exports = router;
