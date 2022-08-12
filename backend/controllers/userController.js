const User = require('../models/users');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require(`../middlewares/catchAsyncError`);
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const newuse = {...req.body, avatar: {
        public_id: "Avatar/istockphoto-1270067126-612x612_iujool",
        url: "https://res.cloudinary.com/dgp5b788s/image/upload/v1659867328/Avatar/istockphoto-1270067126-612x612_iujool.jpg"
    }}
    const {name, password , email} = req.body;
    const newUser = await User.create(newuse) 
    sendToken(newUser, 200, res)
})
exports.loginUser = catchAsyncError(async (req,res,next) => {
    const {email, password} = req.body
    if(!email||!password){
        return next(new ErrorHandler("please enter email and password",400))
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    sendToken(user, 200, res)
})
//logout user => delete token from cookies
exports.logoutUser = catchAsyncError(async (req,res,next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        status: "success",
        message: "Logout success"
    })
})
//forgot password
exports.forgotPassword = catchAsyncError(async (req, res,next) => {
    const user = await User.findOne({email: req.body.email});
    
    if(!user) {
        return next(new ErrorHandler("user email not found",404))
    }

    const passwordToken =  user.getResetPasswordToken();
    await user.save({validateBeforeSave:false})
    //create reset password url
    const passwordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${passwordToken}`
    const message = `your password reset token is as follows:\n\n ${passwordUrl} \n\n If you have not requested
    this email then ignore it.`
    try {
        await sendEmail({
            email:user.email,
            subject: `password reset`,
            message
        })
        res.status(200).json({
            success: true,
            message: `email sent to ${user.email}`
        })
    } catch (error) {
        user.ResetPasswordToken = undefined;
        user.ResetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))

    }
})

exports.resetPassword = catchAsyncError(async (req, res,next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        hashedToken,
        ResetPasswordExpire: {$gt: Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("invalid token",400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("password and confirm password do not match",400))
    }
    user.password = req.body.password;
    user.ResetPasswordToken = undefined;
    user.ResetPasswordExpire = undefined;
    await user.save()
    sendToken(user, 200, res)
} )
//logged profile
exports.getUserProfile = catchAsyncError(async (req, res,next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})
//update password
exports.updatePassword = catchAsyncError(async (req, res,next) => {
    const user = await User.findById(req.user.id).select('+password')
    if(!(await user.comparePassword(req.body.oldPassword))){
        return next(new ErrorHandler("old password is incorrect",400))
    }
    user.password = req.body.password;
    await user.save()
    sendToken(user, 200, res)
}) 
//update profile
exports.updateProfile = catchAsyncError(async (req, res,next) => {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {new: true, 
        runValidators: true,
        userFindAndModify: false})
    res.status(200).json({
        success: true
    })
} )
//admin get all users
exports.getAllUsers = catchAsyncError(async (req, res,next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
} )
//admin get single user
exports.getSingleUser = catchAsyncError(async (req, res,next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("user not found",404))
    }
    res.status(200).json({
        success: true,
        user
    })
} )
// admin update user
exports.updateUser = catchAsyncError(async (req, res,next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, 
        runValidators: true,
        userFindAndModify: false})
    if(!user){
        return next(new ErrorHandler("user not found",404))
    }
    res.status(200).json({
        success: true
    })
} )
//admin delete user
exports.deleteUser = catchAsyncError(async (req, res,next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return next(new ErrorHandler("user not found",404))
    }
    res.status(200).json({
        success: true
    })
} )