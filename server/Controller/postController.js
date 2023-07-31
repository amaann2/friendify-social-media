const {
  getAll,
  createOne,
  deleteOne,
  updateOne,
  getOne,
} = require("./handleFactory");
const catchAsyncError = require("../Utils/catchAsyncError");
const Post = require("../Model/postModel");

exports.createPost = catchAsyncError(async (req, res) => {
  const postData = {
    ...req.body,
    user: req.user.id,
  };
  const doc = await Post.create(postData);
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.getPost = getOne(Post);
exports.getAllPost = getAll(Post);
exports.updatePost = updateOne(Post);
exports.deletePost = deleteOne(Post);
