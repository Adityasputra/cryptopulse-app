const CoinController = require("../controllers/coinController");

const router = require("express").Router();

router.post("/", CoinController.createCoin);
router.get("/", CoinController.getAllCoins);
router.get("/:id", CoinController.getCoinById);
router.put("/:id", () => {});
router.delete("/:id", () => {});

router.get("/:coinId/news", () => {});
router.get("/:coinId/transactions", () => {});

module.exports = router;
