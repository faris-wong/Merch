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
  body("username", "username is required").isString(),
  body("username", "username is between 1 and 18 characters").isLength({
    min: 1,
    max: 18,
  }),
  body("contact", "HP contact length is 8").isLength({ min: 8, max: 8 }),
];

const validateLoginData = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty().isString(),
];

const validateUpdateProfileData = [
  body("username", "username length between 1 to 18")
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ min: 1, max: 18 }),
  body("contact", "HP contact length is 8")
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ min: 8, max: 8 }),
  body("address")
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ min: 1, max: 50 }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateUpdateProfileData,
};
