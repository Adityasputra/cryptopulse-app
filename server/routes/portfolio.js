const router = require("express").Router();

router.post("/", () => {});
router.get("/", () => {});
router.get("/:id", () => {});
router.put("/:id", () => {});
router.delete("/:id", () => {});

router.get("/:portfolioId/items", () => {});

module.exports = router;
