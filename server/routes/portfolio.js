const router = require("express").Router();
const PortfolioController = require("../controllers/portfolioController");
const auth = require("../middlewares/authentication");

router.post("/portfolios", auth, PortfolioController.createPortfolio);
router.get("/portfolios", auth, PortfolioController.getAllPortfolios);
router.get("/portfolios/:id", auth, PortfolioController.getPortfolioById);
router.put("/portfolios/:id", auth, PortfolioController.updatePortfolio);
router.delete("/portfolios/:id", auth, PortfolioController.deletePortfolio);
router.get("/user-portfolios", auth, PortfolioController.getUserPortfolios);
router.get(
  "/portfolios/:portfolioId/items",
  auth,
  PortfolioController.getPortfolioItems
);
router.post("/buy-coin", auth, PortfolioController.buyCoin);

module.exports = router;
