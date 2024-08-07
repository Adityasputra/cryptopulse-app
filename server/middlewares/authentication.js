const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const [type, token] = accessToken.split(" ");
    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = auth;
