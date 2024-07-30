const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty().isString(),
  body(
    "password",
    "password length min is 8 and max is 30 characters"
  ).isLength({
    min: 8,
    max: 30,
  }),
];

const validateLoginData = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty().isString(),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
};
