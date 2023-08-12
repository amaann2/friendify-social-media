const express = require("express");
const {
  createComment,
  getCommentOnPost,
  updateComment,
  deleteComment,
} = require("../Controller/commentController");
const { protect } = require("../Controller/authController");

const router = express.Router();

router.post("/new/:id", protect, createComment);

router.get("/:id", getCommentOnPost);

router
  .route("/:commentId")
  .patch(protect, updateComment)
  .delete(protect, deleteComment);
module.exports = router;
