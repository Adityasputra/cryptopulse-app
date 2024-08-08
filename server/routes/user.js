const router = require("express").Router();
const UserController = require("../controllers/userController");
const auth = require("../middlewares/authentication");

router.get("/", auth, UserController.getAllUsers);
router.get("/:id", auth, UserController.getUserById);
router.put("/:id", auth, UserController.updateUser);
router.delete("/:id", auth, UserController.deleteUser);
router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/google-login", UserController.googleLogin);

module.exports = router;
