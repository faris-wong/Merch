const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUserAccount,
  login,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");

router.get("/users", getAllUsers);
router.get("/user", getUserById);
router.put("/register", createUserAccount);
router.post("/login", login);
router.patch("/user", updateUserById);
router.delete("/user", deleteUserById);

module.exports = router;
