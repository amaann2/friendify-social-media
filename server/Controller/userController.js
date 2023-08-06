const User = require("../Model/userModel");
const catchAsyncError = require("../Utils/catchAsyncError");
const AppError = require("../utils/appError");
const { getOne, getAll } = require("./handleFactory");

exports.getUser = getOne(User);

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("posts");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.getAllUser = getAll(User);
