const { getAll, deleteOne, updateOne, getOne } = require("./handleFactory");
const catchAsyncError = require("../Utils/catchAsyncError");
const Post = require("../Model/postModel");
const User = require("../Model/userModel");
const AppError = require("../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image ! please upload a image", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPostImage = upload.fields([
  {
    name: "media",
    maxCount: 1,
  },
]);
exports.resizePostImages = catchAsyncError(async (req, res, next) => {
  if (!req.files.media) return next();

  req.body.media = `user-${req.user.id}-${Date.now()}-post.jpeg`;
  await sharp(req.files.media[0].buffer)
    // .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.body.media}`);

  next();
});
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
