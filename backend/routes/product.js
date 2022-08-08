const express = require("express")
const router = express.Router()

const {getProducts,
    newProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct
}  = require("../controllers/productController")

const {isAuthenticatedUser,authorizeRoles} = require("../middlewares/auth")

router.route("/products").get(getProducts)
router.route("/products/:id([0-9a-fA-F]{24})").get(getSingleProduct)

router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles('admin'),newProduct)
router.route("/admin/products/:id([0-9a-fA-F]{24})")
    .put(isAuthenticatedUser,authorizeRoles('admin'),updateSingleProduct)
    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct)

module.exports = router;