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
const {
  authorizeUser,
  authorizeAdmin,
} = require("../middleware/authorization");

router.get("/users", getAllUsers);
router.get("/user", getUserById);
router.put("/register", createUserAccount);
router.post("/login", login);
router.patch("/user", authorizeUser, updateUserById);
router.delete("/user", authorizeAdmin, deleteUserById);

module.exports = router;
