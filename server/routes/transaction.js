const TransactionController = require("../controllers/transactionController");
const router = require("express").Router();

router.post("/", TransactionController.createTransaction);
router.get("/", TransactionController.getAllTransactions);
router.get("/:id", TransactionController.getTransactionById);
router.put("/:id", TransactionController.updateTransaction);
router.delete("/:id", TransactionController.deleteTransaction);

module.exports = router;
