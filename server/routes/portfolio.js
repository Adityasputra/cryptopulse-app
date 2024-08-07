const PortfolioController = require("../controllers/portfolioController");
const router = require("express").Router();

router.post("/", PortfolioController.createPortfolio);
router.get("/", PortfolioController.getAllPortfolios);
router.get("/:id", PortfolioController.getPortfolioById);
router.put("/:id", PortfolioController.updatePortfolio);
router.delete("/:id", PortfolioController.deletePortfolio);

router.get("/:portfolioId/items", PortfolioController.getPortfolioItems);

module.exports = router;
