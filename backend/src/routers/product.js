const express = require("express");
const router = express.Router();
const {
  searchAllProducts,
  getAllProductsForSaleForUser,
  searchAllProductsForUser,
  getAllProductListingsBySellerId,
  createProduct,
  deleteProductById,
  updateProductById,
} = require("../controllers/product");
const { authorizeUser } = require("../middleware/authorization");

router.post("/search", searchAllProducts);
// router.get("/listingsforuser", authorizeUser, getAllProductsForSaleForUser);
router.post("/searchbyuser", authorizeUser, searchAllProductsForUser);
router.get("/listingbyuser", authorizeUser, getAllProductListingsBySellerId);
router.put("/product", authorizeUser, createProduct);
router.delete("/product", authorizeUser, deleteProductById);
router.patch("/product", authorizeUser, updateProductById);

module.exports = router;
