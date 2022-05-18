const { UnAuthenticatedError } = require("../errors/index");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // const headers = req.headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //attach  user
    req.user = { userId: payload.userId };
    // req.user = payload;
  } catch (error) {
    console.log(error);
  }

  next();
};

module.exports = auth;
