const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { username, email, password, fullName } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
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
   const isEmail = await User.findOne({ email: email });

    if (!isEmail) return "Please Provide Email";

    const user = await User.findOne({ email: email });

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) return "Invalid Credentials";

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

const updateUser = async (req, res) => {
  try {
    res.send("Update User!");
  } catch (error) {
    res.send(error);
  }
};

module.exports = { register, login, updateUser };
