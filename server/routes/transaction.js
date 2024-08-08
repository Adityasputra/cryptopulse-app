const router = require("express").Router();
const TransactionController = require("../controllers/transactionController");
const auth = require("../middlewares/authentication");

router.post("/transactions", auth, TransactionController.createTransaction);
router.get("/transactions", auth, TransactionController.getAllTransactions);
router.get("/transactions/:id", auth, TransactionController.getTransactionById);
router.put("/transactions/:id", auth, TransactionController.updateTransaction);
router.delete(
  "/transactions/:id",
  auth,
  TransactionController.deleteTransaction
);

module.exports = router;
