const UserController = require("../controllers/userController");
const router = require("express").Router();

router.get("/", UserController.createUser);
router.get("/:id", UserController.getAllUsers);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

router.get("/:userId/notifications", () => {});
router.get("/:userId/transactions", () => {});
router.get("/:userId/portfolios", () => {});

module.exports = router;
