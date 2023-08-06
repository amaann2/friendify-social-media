const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: [true, "A comment must have a content"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
