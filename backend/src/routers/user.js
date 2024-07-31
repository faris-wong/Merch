const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUserAccount,
  login,
  updateUserById,
  deleteUserById,
  deleteUserAdmin,
} = require("../controllers/user");
const {
  authorizeUser,
  authorizeAdmin,
} = require("../middleware/authorization");

const {
  validateRegistrationData,
  validateLoginData,
  validateUpdateProfileData,
} = require("../validators/user");
const { checkErrors } = require("../validators/checkErrors");

router.get("/users", authorizeAdmin, getAllUsers);
router.get("/user", authorizeUser, getUserById);
router.put(
  "/register",
  validateRegistrationData,
  checkErrors,
  createUserAccount
);
router.post("/login", validateLoginData, checkErrors, login);
router.patch(
  "/user",
  validateUpdateProfileData,
  checkErrors,
  authorizeUser,
  updateUserById
);
router.delete("/user", authorizeAdmin, deleteUserAdmin);

module.exports = router;
