const CoinController = require("../controllers/coinController");

const router = require("express").Router();

router.post("/", CoinController.createCoin);
router.get("/", CoinController.getAllCoins);
router.get("/:id", CoinController.getCoinById);
router.put("/:id", CoinController.updateCoin);
router.delete("/:id", () => {});

router.get("/:coinId/data", CoinController.fetchCoinDataFromAPI);
router.get("/list", () => {});

module.exports = router;
