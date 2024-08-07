const { getAllUsers } = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:id", () => {});
router.put("/:id", () => {});
router.delete("/:id", () => {});

router.get("/:userId/notifications", () => {});
router.get("/:userId/transactions", () => {});
router.get("/:userId/portfolios", () => {});

module.exports = router;
