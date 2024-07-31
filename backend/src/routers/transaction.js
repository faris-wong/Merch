const express = require("express");
const router = express.Router();
const {
  purchaseCredits,
  createTransaction,
  getAllTransactions,
  getTransactionsByUserId,
} = require("../controllers/transaction");
const { validateCredits } = require("../validators/transaction");
const { authorizeUser } = require("../middleware/authorization");
const { checkErrors } = require("../validators/checkErrors");

router.patch(
  "/credits",
  validateCredits,
  checkErrors,
  authorizeUser,
  purchaseCredits
);
router.put("/purchase", authorizeUser, createTransaction);
// router.get("/alltrades", getAllTransactions);
router.get("/tradehistory", authorizeUser, getTransactionsByUserId);

module.exports = router;
