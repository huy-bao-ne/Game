const express = require("express");
const router = express.Router();
const { loginOrRegister } = require("../controllers/user-controller");

// Route for user login
router.post("/login", loginOrRegister);

module.exports = router;
