const router = require("express").Router();
const CoinController = require("../controllers/coinController");
const auth = require("../middlewares/authentication");

router.post("/", auth, CoinController.createCoin);
router.get("/", auth, CoinController.getAllCoins);
router.get("/:id", auth, CoinController.getCoinById);
router.put("/:id", auth, CoinController.updateCoin);
router.delete("/:id", auth, CoinController.deleteCoin);
router.get("/api/:coinId", auth, CoinController.fetchCoinDataFromAPI);
router.get("/api/list", auth, CoinController.fetchCoinListFromApi);

module.exports = router;
