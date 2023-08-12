const catchAsyncError = require("../Utils/catchAsyncError");
const Post = require("../Model/postModel");
const User = require("../Model/userModel");
const AppError = require("../utils/appError");
const cloudinary = require("../Utils/cloudinary");

// create post
exports.createPost = catchAsyncError(async (req, res) => {
  const myCloud = await cloudinary.uploader.upload(req.file.path, {
    folder: "posts",
  });
  const avatarData = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  const postData = {
    ...req.body,
    user: req.user.id,
    media: avatarData,
  };

  const doc = await Post.create(postData);

  await User.findByIdAndUpdate(req.user.id, { $push: { posts: doc._id } });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

// get all post
exports.getAllPost = catchAsyncError(async (req, res) => {
  let query = Post.find();

  query = query.sort("-createdAt");
  const documents = await query;

  res.status(200).json({
    status: "success",
    results: documents.length,
    data: documents,
  });
});

// get single post
exports.getPost = catchAsyncError(async (req, res, next) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("No Post found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: post,
  });
});

// update post
exports.updatePost = catchAsyncError(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  if (post.user.id.toString() !== userId) {
    return next(
      new AppError("You are not authorized to update this post", 403)
    );
  }

  post.content = req.body.content;

  await post.save();

  res.status(200).json({
    status: "Success",
    data: post,
  });
});

// delete post
exports.deletePost = catchAsyncError(async (req, res, next) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("No Post found with that id", 404));
  }

  if (post.user.id.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to delete this post", 403)
    );
  }

  await post.deleteOne();

  const user = await User.findById(req.user.id);
  user.posts.pull(postId);
  await user.save();

  res.status(204).json({
    status: true,
    data: null,
  });
});


// like | unlike post
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

  const message = isLiked ? "Post Unliked " : "Post Liked";
  res.status(200).json({
    status: "Success",
    message: message,
  });
});
