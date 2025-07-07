// controllers/user.controller.js
const UserService = require("../services/user-service.js");

// This function handles both user login and registration
// If the user exists, it checks the password and logs them in
// If the user does not exist, it creates a new user account
const loginOrRegister = async (req, res) => {
  //const { username, password } = req.body
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password)
    return res.status(400).json({ message: "Missing credentials" });

  try {
    const existingUser = await UserService.findUserByUsername(username);

    if (existingUser) {
      if (existingUser.password === password) {
        return res.json({
          message: "Login success",
          user: existingUser,
        });
      } else {
        return res.status(401).json({ message: "Wrong password" });
      }
    }

    const newUser = await UserService.createUser(username, password);
    return res.json({
      message: "User created",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginOrRegister };
