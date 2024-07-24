const express = require("express");
const router = express.Router();
const {
  purchaseCredits,
  createTransaction,
  getAllTransactions,
  getTransactionsByUserId,
} = require("../controllers/transaction");
const { authorizePurchase } = require("../middleware/authorization");

router.patch("/credits", purchaseCredits);
router.put("/purchase", authorizePurchase, createTransaction);
router.get("/alltrades", getAllTransactions);
router.get("/tradehistory", getTransactionsByUserId);

module.exports = router;
