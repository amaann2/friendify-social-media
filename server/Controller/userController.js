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

//* ---------------- follow user------------------------------

exports.followUser = catchAsyncError(async (req, res, next) => {
  //todo : get id of both user
  const userToFollowId = req.params.id;
  const currentUserId = req.user.id;

  if (userToFollowId === currentUserId) {
    return next(new AppError("you cannot follow yourself", 400));
  }

  //todo:  Add the current user to the target user's followers
  const targetUser = await User.findById(userToFollowId);
  if (!targetUser) {
    return next(new AppError("user not found", 404));
  }

  if (targetUser.followers.includes(currentUserId)) {
    return next(new AppError("you are already following this user", 400));
  }
  targetUser.followers.push(currentUserId);

  //todo: Add the target user to the current user's following
  const currentUser = await User.findById(currentUserId);
  currentUser.following.push(userToFollowId);

  await currentUser.save();
  await targetUser.save();

  res.status(200).json({
    status: "Success",
    message: "Followed",
  });
});

//* ---------------- Unfollow user------------------------------

exports.unfollowUser = catchAsyncError(async (req, res, next) => {
  //Todo : get the id of user to unfollow and current user id from the request
  const userToUnfollowId = req.params.id;
  const currentUserId = req.user.id;

  //Todo : check if the user is trying to unfollow themselve
  if (currentUserId === userToUnfollowId) {
    return next(new AppError("you cannot unfollow yourself", 404));
  }

  //Todo :  find the target user to unfollow in the database
  const targetUser = await User.findById(userToUnfollowId);
  if (!targetUser) {
    return next(new AppError("user not found", 400));
  }

  // TOdo :  Check if the current user if following the target user
  //TOdo : if current user is following the target  user then perform the unfollow action otherwise return an error

  if (targetUser.followers.includes(currentUserId)) {
    targetUser.followers.pull(currentUserId);

    const currentUser = await User.findById(currentUserId);
    currentUser.following.pull(userToUnfollowId);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      status: "Success",
      message: "Unfollowed",
    });
  } else {
    return next(
      new AppError("Not following the user, no unfollow action performed", 404)
    );
  }
});
