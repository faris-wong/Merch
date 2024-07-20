const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUserAccount,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");

router.get("/users", getAllUsers);
router.get("/user", getUserById);
router.put("/user", createUserAccount);
router.patch("/user", updateUserById);
router.delete("/user", deleteUserById);

module.exports = router;
