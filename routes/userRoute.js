const express = require("express");
const { register, login, updateUser } = require("../controllers/user");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user/:id").patch(updateUser);

module.exports = router;
