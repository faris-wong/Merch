const express = require("express");
const router = express.Router();
const {
  purchaseCredits,
  createTransaction,
  getAllTransactions,
  getTransactionsByUserId,
} = require("../controllers/transaction");
const { authorizeUser } = require("../middleware/authorization");

router.patch("/credits", authorizeUser, purchaseCredits);
router.put("/purchase", authorizeUser, createTransaction);
router.get("/alltrades", getAllTransactions);
router.get("/tradehistory", authorizeUser, getTransactionsByUserId);

module.exports = router;
