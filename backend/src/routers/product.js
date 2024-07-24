const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductsForSale,
  getAllProductListingsBySellerId,
  createProduct,
  deleteProductById,
  updateProductById,
} = require("../controllers/product");

router.get("/products", getAllProducts);
router.get("/listings", getAllProductsForSale);
router.get("/listingbyuser", getAllProductListingsBySellerId);
router.put("/product", createProduct);
router.delete("/product", deleteProductById);
router.patch("/product", updateProductById);

module.exports = router;
