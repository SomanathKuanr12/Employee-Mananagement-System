const express=require('express');
const otpRoute=express.Router();
const mailController=require('../controller/nodemailer')
otpRoute.post('/',mailController.sendEmail);
otpRoute.get('/:otp/:email',mailController.verifyOtp);
otpRoute.put('/',mailController.updatePassword);


module.exports=otpRoute;