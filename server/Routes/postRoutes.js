const express = require("express");
const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likeUnlikePost,
} = require("../Controller/postController");
const { protect } = require("../Controller/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllPost).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

router.patch("/likeUnlike/:id", likeUnlikePost);

module.exports = router;
