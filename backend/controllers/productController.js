const Product  = require('../models/products')
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
const APIFeatures = require("../utils/apifeatures")
/* This is a function that creates a new product. admin api/v1/products*/
exports.newProduct = catchAsyncError(async (req, res,next) => {
    req.body.user=req.user.id;
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

/* This is a function that gets all the products in the database. */
exports.getProducts = catchAsyncError(async (req, res,next) => {
    const resPerPage = 4;
    const productCount = await Product.countDocuments();
    const apifeatures = new APIFeatures(Product.find(),req.query)
                                .search()
                                .filter()
                                .pagination(resPerPage)
    const products = await apifeatures.query;

    res.status(200).json({
        success : true,
        count : products.length,
        productCount,
        products
    });
})



/* This is a function that gets a single product by id. */
exports.getSingleProduct =catchAsyncError(async (req, res,next) => {

    const id = req.params.id;
    const product = await Product.findById(id)
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    else{
        res.status(200).json({
            success: true,
            product
        })
    }
})

/* The above code is updating a single product. admin api/v1/products/:id*/
exports.updateSingleProduct = catchAsyncError(async (req, res,next) => {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body,
             {new: true,
            useValidators: true,
            useFindAndModify: false 
        })
        if(!product){
            return next(new ErrorHandler("Product not found", 404))
        }
        else{
            res.status(200).json({
                success: true,
                product
            })
        }
    })

    /* This is a function that deletes a single product. admin api/v1/products/:id */
exports.deleteProduct = catchAsyncError(async (req, res,next) => {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product not found", 404))
        }
        else{
            res.status(200).json({
                success: true,
                message: "Product deleted"
            })
        }
    })