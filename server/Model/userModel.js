const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  username: {
    type: String,
    required: [true, "A User must have a username"],
    unique: [true, "username doesn't exists ! try another username "],
    lowercase: [true, "username must me in lowercase"],
  },
  email: {
    type: String,
    required: [true, " A user must have a email"],
    unique: [true, "Email id already exists"],
    lowercase: true,
    validate: [validator.isEmail, "please provide correct email address"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
  },
  role: {
    type: String,
    default: "user",
  },
  gender: {
    type: String,
  },
  mobile: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, "any", { strictMode: false });
      },
      message: "Please provide a valid mobile number",
    },
  },
  bio: {
    type: String,
    maxlength: 150,
  },
  dateOfBirth: {
    type: Date,
  },
  location: {
    type: String,
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
