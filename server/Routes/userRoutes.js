const express = require("express");
const {
  signUp,
  login,
  logout,
  protect,
  getMe,
} = require("../Controller/authController");
const { getUser, getUserProfile } = require("../Controller/userController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", protect, getMe, getUser);

router.route("/:id").get(getUser);
router.get("/profile/:id", getUserProfile);
module.exports = router;
