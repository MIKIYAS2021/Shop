const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    
    if(process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(err.statuscode).json({
            success: true,
            error: err,
            errMassage: err.message,
            stack: err.stack
            });
    } else if(process.env.NODE_ENV === "PRODUCTION") {
        let error = {...err};
        error.message = err.message

        res.status(error.statuscode).json({
            success: false,
            message: error.message ||  "internal server error"
        });
    } 
}
