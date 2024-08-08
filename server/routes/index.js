const router = require("express").Router();

const userRoutes = require("./user");
const portfolioRoutes = require("./portfolio");
const portfolioItemRoutes = require("./portfolioItem");
const transactionRoutes = require("./transaction");
const notificationRoutes = require("./notification");
const coinRoutes = require("./coin");
const newsRoutes = require("./news");

router.use("/api/users", userRoutes);
router.use("/api/portfolios", portfolioRoutes);
router.use("/api/portfolio-items", portfolioItemRoutes);
router.use("/api/transactions", transactionRoutes);
router.use("/api/notifications", notificationRoutes);
router.use("/api/coins", coinRoutes);
router.use("/api/news", newsRoutes);

module.exports = router;
