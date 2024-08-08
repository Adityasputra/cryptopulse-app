const router = require("express").Router();
const NewsController = require("../controllers/newsController");
const auth = require("../middlewares/authentication");

router.post("/", auth, NewsController.createNews);
router.get("/", auth, NewsController.getAllNews);
router.get("/:id", auth, NewsController.getNewsById);
router.put("/:id", auth, NewsController.updateNews);
router.delete("/:id", auth, NewsController.deleteNews);

module.exports = router;
