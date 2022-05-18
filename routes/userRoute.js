const express = require("express");
const { register, login, updateUser } = require("../controllers/user");
const router = express.Router();
const authenticateUser = require('../middlewares/auth');

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").patch(authenticateUser,updateUser);

module.exports = router;
