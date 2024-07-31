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
const { validateProduct } = require("../validators/transaction");
const { checkErrors } = require("../validators/checkErrors");

router.post("/search", searchAllProducts);
// router.get("/listingsforuser", authorizeUser, getAllProductsForSaleForUser);
router.post("/searchbyuser", authorizeUser, searchAllProductsForUser);
router.get("/listingbyuser", authorizeUser, getAllProductListingsBySellerId);
router.put(
  "/product",
  validateProduct,
  checkErrors,
  authorizeUser,
  createProduct
);
router.delete("/product", authorizeUser, deleteProductById);
router.patch(
  "/product",
  validateProduct,
  checkErrors,
  authorizeUser,
  updateProductById
);

module.exports = router;
