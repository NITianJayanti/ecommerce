const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/new").post(createProduct, isAuthenticatedUser);

router
  .route("/product/:id")
  .put(updateProduct, isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteProduct, isAuthenticatedUser, authorizeRoles("admin"))
  .get(getProductDetails);

module.exports = router;
