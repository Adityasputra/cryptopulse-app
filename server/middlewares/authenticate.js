const jwt = require("jsonwebtoken");
const { verifyToken } = require("../helpers/jwt");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw { name: "Unauthorized" };
  }

  try {
    const decode = verifyToken(token);
    req.user = decode;
    next();
  } catch (error) {
    if (error.name === "Unauthorized") {
      res.status(401).json({
        message: "Invalid Token",
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};

module.exports = auth;
