const Product  = require('../models/products')
const ErrorHandler = require("../utils/errorHandler")

/* This is a function that creates a new product. admin api/v1/products*/
exports.newProduct = async (req, res,next) => {

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
}

/* This is a function that gets all the products in the database. */
exports.getProducts = async (req, res,next) => {

    const products = await Product.find()

    res.status(200).json({
        success : true,
        count : products.length,
        products
    });
}



/* This is a function that gets a single product by id. */
exports.getSingleProduct = async (req, res, next) => {

    const id = req.params.id;
    const product = await Product.findById(id)
    if(!product){
        return next(new ErrorHandler( "Product not found", 404))
    }
    else{
        res.status(200).json({
            success: true,
            product
        })
    }
}

/* The above code is updating a single product. admin api/v1/products/:id*/
exports.updateSingleProduct = async (req, res, next) => {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body,
             {new: true,
            useValidators: true,
            useFindAndModify: false 
        })
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        else{
            res.status(200).json({
                success: true,
                product
            })
        }
    }

    /* This is a function that deletes a single product. admin api/v1/products/:id */
exports.deleteProduct = async (req, res, next) => {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        else{
            res.status(200).json({
                success: true,
                message: "Product deleted"
            })
        }
    }