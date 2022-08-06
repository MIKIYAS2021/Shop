const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    
    if(process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(err.statuscode).json({
            success: false,
            error: err,
            errMassage: err.message,
            stack: err.stack
            });
    } else if(process.env.NODE_ENV === "PRODUCTION") {
        let error = {...err};
        error.message = err.message
        
        /*handle errormongoose id error */
        if(err.name === "castError") {
            const message = `Resource not found. invalid ${err.path}`;
            error = new ErrorHandler(message, 404);
        }
        //handle mongoose validation error
        if(err.name === "mongooseValidationError") {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }
    


        res.status(error.statuscode).json({
            success: false,
            message: error.message ||  "internal server error"
        });
    } 
}
