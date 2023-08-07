const express = require("express");
const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  uploadPostImage,
  resizePostImages,
} = require("../Controller/postController");
const { protect } = require("../Controller/authController");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getAllPost)
  .post(uploadPostImage, resizePostImages, createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

router.patch("/likeUnlike/:id", likeUnlikePost);

module.exports = router;
