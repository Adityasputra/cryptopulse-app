const router = require("express").Router();
const {
  createUser,
  loginUser,
  googleLogin,
} = require("../controllers/userController");

const routerUsers = require("./user");
const routerCoins = require("./coin");
const routerPortfolios = require("./portfolio");
const routerPortfolioItems = require("./portfolioItem");
const routerNews = require("./news");
const routerNotifications = require("./notification");
const routerTransactions = require("./transaction");

const auth = require("../middlewares/authentication");
const UserController = require("../controllers/userController");

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/google", googleLogin);

// Use Middlewares
router.use("/api/users", routerUsers);
router.use("/api/portfolios", auth, routerPortfolios);
router.use("/api/portfolio-items", auth, routerPortfolioItems);
router.use("/api/coins", routerCoins);
router.use("/api/transactions", auth, routerTransactions);
router.use("/api/notifications", auth, routerNotifications);
router.use("/api/news", routerNews);

module.exports = router;
