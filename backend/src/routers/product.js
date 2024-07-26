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
const { authorizeUser } = require("../middleware/authorization");

router.get("/products", getAllProducts);
router.get("/listings", getAllProductsForSale);
router.get("/listingbyuser", authorizeUser, getAllProductListingsBySellerId);
router.put("/product", authorizeUser, createProduct);
router.delete("/product", authorizeUser, deleteProductById);
router.patch("/product", authorizeUser, updateProductById);

module.exports = router;
