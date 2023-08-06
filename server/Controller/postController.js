const {
  getAll,
  createOne,
  deleteOne,
  updateOne,
  getOne,
} = require("./handleFactory");
const catchAsyncError = require("../Utils/catchAsyncError");
const Post = require("../Model/postModel");
const User = require("../Model/userModel");
const AppError = require("../utils/appError");

exports.createPost = catchAsyncError(async (req, res) => {
  const postData = {
    ...req.body,
    user: req.user.id,
  };

  const doc = await Post.create(postData);
  await User.findByIdAndUpdate(req.user.id, { $push: { posts: doc._id } });
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.likeUnlikePost = catchAsyncError(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  //Todo : Find the post in the db based on the postId
  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  //TOdo: Check if the user has already liked the post
  const isLiked = post.likes.includes(userId);

  if (isLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  //TODO: Save the updated post in the database
  await post.save();

  // TODO: send response
  const message = isLiked ? "Post Unliked " : "Post Liked";
  res.status(200).json({
    status: "Success",
    message: message,
  });
});
exports.getPost = getOne(Post);
exports.getAllPost = getAll(Post);
exports.updatePost = updateOne(Post);
exports.deletePost = deleteOne(Post);
