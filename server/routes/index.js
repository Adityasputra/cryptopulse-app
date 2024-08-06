const router = require("express").Router();

// Routes
const routerUsers = require("./user");
const routerCoins = require("./coin");
const routerPortfolios = require("./portfolio");
const routerPortfolioItems = require("./portfolioItem");
const routerNews = require("./news");
const routerNotifications = require("./notification");
const routerTransactions = require("./transaction");

// EndPoint
router.use("/users", routerUsers);
router.use("/portfolios", routerPortfolios);
router.use("/portfolio-items", routerPortfolioItems);
router.use("/api/coins", routerCoins);
router.use("/transactions", routerTransactions);
router.use("/notifications", routerNotifications);
router.use("/news", routerNews);

module.exports = router;
