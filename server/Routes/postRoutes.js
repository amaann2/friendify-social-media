const express = require("express");
const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../Controller/postController");
const router = express.Router();
const { protect } = require("../Controller/authController");


router.use(protect);
router.route("/").get(getAllPost).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);
module.exports = router;
