const User = require("../Model/userModel");
const catchAsyncError = require("../Utils/catchAsyncError");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const { promisify } = require("util");
const signInToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signInToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  }
  res.cookie("token", token, cookieOptions);
  res.status(statusCode).json({
    status: "sucess",
    user,
  });
};

exports.signUp = catchAsyncError(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  createSendToken(user, 200, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please provide username and password", 400));
  }

  const user = await User.findOne({ username });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email and Password", 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsyncError(async (req, res, next) => {
  let token;

  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name == "token") {
        token = value;
        break;
      }
    }
  }
  if (!token) {
    return next(
      new AppError("You are not logged in please log in to access ", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belong to this token does no longer exists", 401)
    );
  }
  req.user = freshUser;
  next();
});

exports.restrictTo = (...userRoles) => {
  return (req, res, next) => {
    if (!userRoles.includes(req.user.role)) {
      return next(
        new appError("you do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logout Successfull",
  });
});
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
