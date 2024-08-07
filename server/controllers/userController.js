const { hashPassword } = require("../helpers/hashPassword");
const { User } = require("../models");

module.exports = class UserController {
  static async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const validate = error.errors.map((e) => e.message);
        res.status(400).json({
          message: validate,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
};
