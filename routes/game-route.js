const express = require("express");
const router = express.Router();
const { getState, saveState } = require("../controllers/game-controller");

router.get("/state", getState);
router.post("/save", saveState);

module.exports = router;
