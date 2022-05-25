import express from "express";
const router = express.Router();
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message:'Too many request from this IP address, please try again after 15 minutes',
})

import { register, login, updateUser } from "../controllers/user.js";
import authenticateUser from "../middlewares/auth.js";

router.route("/register").post(apiLimiter,register);
router.route("/login").post(apiLimiter,login);
router.route("/user").patch(authenticateUser, updateUser);

export default router
