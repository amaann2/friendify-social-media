const multerStorage = multer.memoryStorage();
const multer = require("multer");
const sharp = require("sharp");
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
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.body.media}`);

  next();
});
