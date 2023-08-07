const multer = require("multer");
const path = require("path");
const AppError = require("./appError");

//* Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new AppError("Not an image ! please upload a image", 400), false);
      return;
    }
    cb(null, true);
  },
});
