const express = require("express")
const router = express.Router()

const {getProducts,
    newProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct
}  = require("../controllers/productController")


router.route("/products").get(getProducts)
router.route("/products/:id([0-9a-fA-F]{24})").get(getSingleProduct)

router.route("/admin/products/new").post(newProduct)
router.route("/admin/products/:id([0-9a-fA-F]{24})")
    .put(updateSingleProduct)
    .delete(deleteProduct)

module.exports = router;