const router = require("express").Router();

// Routes
const routerUsers = require("./user");
const routerCoins = require("./coin");
const routerPortfolios = require("./portfolio");
const routerPortfolioItems = require("./portfolioItem");
const routerNews = require("./news");
const routerNotifications = require("./notification");
const routerTransactions = require("./transaction");
const auth = require("../middlewares/authenticate");
const fetchCoinListMiddleware = require("../middlewares/fetchCoinList");
const { createUser } = require("../controllers/userController");

// EndPoint
router.post("/register", createUser);
router.post("/login", () => {});
router.post("/google", () => {});

router.use("/users", routerUsers);
router.use("/portfolios", auth, routerPortfolios);
router.use("/portfolio-items", auth, routerPortfolioItems);
router.use("/api/coins", fetchCoinListMiddleware, routerCoins);
router.use("/transactions", auth, routerTransactions);
router.use("/notifications", auth, routerNotifications);
router.use("/news", routerNews);

module.exports = router;
