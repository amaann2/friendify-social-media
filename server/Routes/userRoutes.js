const express = require("express");
const {
  signUp,
  login,
  logout,
  protect,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../Controller/authController");
const {
  getUser,
  getUserProfile,
  getAllUser,
  followUser,
  unfollowUser,
} = require("../Controller/userController");
const upload = require("../Utils/multer");

const router = express.Router();

// authentication
router.post("/signup", upload.single("avatar"), signUp);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.get("/me", protect, getMe, getUser);

// user crud operation
router.route("/").get(getAllUser);
router.route("/:id").get(getUser);
router.get("/profile/:id", getUserProfile);

// follow | Unfollow  a user
router.post("/:id/follow", protect, followUser);
router.post("/:id/unfollow", protect, unfollowUser);

//upload a user photo

module.exports = router;
