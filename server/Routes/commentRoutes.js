const express = require("express");
const {
  createComment,
  getCommentOnPost,
} = require("../Controller/commentController");
const { protect } = require("../Controller/authController");

const router = express.Router();

router.post("/new/:id", protect, createComment);

router.get("/:id", getCommentOnPost);
module.exports = router;
