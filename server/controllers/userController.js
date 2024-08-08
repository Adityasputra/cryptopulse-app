const { User } = require("../models");
const { comparedPassword } = require("../helpers/hashPassword");
const { signToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((e) => e.message);
        res.status(400).json({ errors });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateUser(req, res) {
    try {
      const [updated] = await User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      if (updated === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const deleted = await User.destroy({
        where: { id: req.params.id },
      });
      if (deleted === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ where: { email } });

      if (!user || !comparedPassword(password, user.password)) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const access_token = signToken({ id: user.id, email: user.email });

      res.status(200).json({ access_token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async googleLogin(req, res) {
    try {
      res.status(501).json({ message: "Google login not implemented yet" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
