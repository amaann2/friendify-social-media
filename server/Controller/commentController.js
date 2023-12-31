const Comment = require("../Model/commentModel");
const Post = require("../Model/postModel");
const catchAsyncError = require("../Utils/catchAsyncError");
const AppError = require("../utils/appError");

exports.createComment = catchAsyncError(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError("post not found", 404));
  }
  const newComment = await Comment.create({
    content: req.body.content,
    post: postId,
    user: userId,
  });
  post.comments.push(newComment._id);
  await post.save();

  res.status(201).json({
    status: "Success",
    data: newComment,
  });
});

exports.getCommentOnPost = catchAsyncError(async (req, res, next) => {
  const postId = req.params.id;
  const doc = await Comment.find({ post: postId }).populate({
    path: "user",
    select: "username avatar",
  });

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: doc,
  });
});

exports.updateComment = catchAsyncError(async (req, res, next) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new AppError("no comment found ", 404));
  }

  if (comment.user.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to update this comment", 403)
    );
  }
  comment.content = req.body.content;
  await comment.save();

  res.status(200).json({
    status: "Success",
    data: comment,
  });
});
exports.deleteComment = catchAsyncError(async (req, res, next) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new AppError("no comment found ", 404));
  }

  if (comment.user.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to update this comment", 403)
    );
  }
  await comment.deleteOne();

  res.status(204).json({
    status: "Success",
    data: null,
  });
});
