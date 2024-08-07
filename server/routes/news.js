const NewsController = require("../controllers/newsController");
const router = require("express").Router();

router.post("/", NewsController.createNews);
router.get("/", NewsController.getAllNews);
router.get("/:id", NewsController.getNewsById);
router.put("/:id", NewsController.updateNews);
router.delete("/:id", NewsController.deleteNews);

module.exports = router;
