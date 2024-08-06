const router = require("express").Router();

router.post("/", () => {});
router.get("/", () => {});
router.get("/:id", () => {});
router.put("/:id", () => {});
router.delete("/:id", () => {});

router.get("/:coinId/news", () => {});
router.get("/:coinId/transactions", () => {});

module.exports = router;
