const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductListingsBySellerId,
  createProduct,
  deleteProductById,
  updateProductById,
} = require("../controllers/product");

router.get("/products", getAllProducts);
router.get("/listingbyuser", getAllProductListingsBySellerId);
router.put("/product", createProduct);
router.delete("/product", deleteProductById);
router.patch("/product", updateProductById);

module.exports = router;
