const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct } = require("../controllers/product");

router.get("/products", getAllProducts);
router.put("/product", createProduct);

module.exports = router;
