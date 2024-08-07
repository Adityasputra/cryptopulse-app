const CoinController = require("../controllers/coinController");
const router = require("express").Router();

router.post("/", CoinController.createCoin);
router.get("/", CoinController.getAllCoins);
router.get("/:id", CoinController.getCoinById);
router.put("/:id", CoinController.updateCoin);
router.delete("/:id", CoinController.deleteCoin);

router.get("/data/:coinId", CoinController.fetchCoinDataFromAPI);
router.get("/list", CoinController.fetchCoinListFromApi);

module.exports = router;
