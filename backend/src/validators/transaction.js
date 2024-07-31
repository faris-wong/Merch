const { body } = require("express-validator");

const validateCredits = [
  body("value", "must be number").isNumeric(),
  body("value").isLength({
    min: 1,
    max: 5,
  }),
];

const validateProduct = [
  body("productname").notEmpty().isString(),
  body("description").isString(),
  body("price").notEmpty().isNumeric(),
];

module.exports = {
  validateCredits,
  validateProduct,
};
