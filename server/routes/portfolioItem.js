const router = require("express").Router();
const PortfolioItemController = require("../controllers/portfolioItemController");
const auth = require("../middlewares/authentication");

router.post(
  "/portfolio-items",
  auth,
  PortfolioItemController.createPortfolioItem
);
router.get(
  "/portfolio-items",
  auth,
  PortfolioItemController.getAllPortfolioItems
);
router.get(
  "/portfolio-items/:id",
  auth,
  PortfolioItemController.getPortfolioItemById
);
router.put(
  "/portfolio-items/:id",
  auth,
  PortfolioItemController.updatePortfolioItem
);
router.delete(
  "/portfolio-items/:id",
  auth,
  PortfolioItemController.deletePortfolioItem
);

module.exports = router;
