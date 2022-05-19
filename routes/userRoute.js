import express from "express";
import { register, login, updateUser } from "../controllers/user.js";
const router = express.Router();
import authenticateUser from "../middlewares/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").patch(authenticateUser, updateUser);

export default router
