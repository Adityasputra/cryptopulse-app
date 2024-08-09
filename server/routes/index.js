const router = require("express").Router();

const userRoutes = require("./user");
const portfolioRoutes = require("./portfolio");
const coinRoutes = require("./coin");
const newsRoutes = require("./news");

router.use("/api/users", userRoutes);
router.use("/api/portfolios", portfolioRoutes);
router.use("/api/coins", coinRoutes);
router.use("/api/news", newsRoutes);

module.exports = router;
