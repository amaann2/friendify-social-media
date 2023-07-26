const express = require("express");
const {
  signUp,
  login,
  logout,
  protect,
  getMe,
  getUser,
} = require("../Controller/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", protect, getMe, getUser);
module.exports = router;
