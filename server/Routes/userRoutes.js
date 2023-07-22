const express = require("express");
const { signUp, login, protect } = require("../Controller/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
module.exports = router;