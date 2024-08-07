const PortfolioItemController = require("../controllers/portfolioItemController");
const router = require("express").Router();

router.post("/", PortfolioItemController.createPortfolioItem);
router.get("/", PortfolioItemController.getAllPortfolioItems);
router.get("/:id", PortfolioItemController.getPortfolioItemById);
router.put("/:id", PortfolioItemController.updatePortfolioItem);
router.delete("/:id", PortfolioItemController.deletePortfolioItem);

module.exports = router;
