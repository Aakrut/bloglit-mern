import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { username, email, password, fullName } = req.body;
  try {
    if (!email || !password || !username || !fullName) {
      throw new BadRequestError("Please Provide All Values");
    }

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      throw new BadRequestError("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      fullName,
      email,
      password:hashedPassword,
    });

     const token = jwt.sign(
       { userId: user._id, userEmail: user.email },
       process.env.JWT_SECRET,
       { expiresIn: process.env.JWT_LIFETIME }
     );

    user.password = undefined;

    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    res.send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new BadRequestError("Please Provide All Values");
    }

    const isEmail = await User.findOne({ email: email });

    if (!isEmail) return "Please Provide Email";

    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) return "Invalid Credentials";

    const token = jwt.sign(
      { userId: user._id, userEmail: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    user.password = undefined;

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    res.send(error);
  }
};

const updateUser = async (req, res) => {
  const { email, username, fullName, bio, avatar } = req.body;

  try {
    if (!email || !fullName || !bio || !username || !avatar) {
      console.log("Please Provide All Values");
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      {
        email: email,
        bio: bio,
        fullName: fullName,
        username: username,
        avatar: avatar,
      },
      { new: true }
    );

    const token = jwt.sign(
      { userId: user._id, userEmail: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    res.send(error);
  }
};

export { register, login, updateUser };
