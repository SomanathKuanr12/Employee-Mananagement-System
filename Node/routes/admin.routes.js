const express = require('express')
const admin = express.Router();
const {verifyAuthAdmin}=require('../middleware/middleware')
const {checkPermission}=require('../middleware/aclMiddleware')
const adminController=require('../controller/adminController')
const signInController=require('../controller/signinGoogleLinkedInController')
const loginLimiter=require('../middleware/failedLoginTracker')

admin.post('/sign_up',verifyAuthAdmin,checkPermission, adminController.adminSignUp)

admin.post('/log_in', loginLimiter, adminController.adminLogIn)
admin.post('/log_in/facebook', adminController.loginWithFacebook)

admin.put('/change',adminController.changePassword)

admin.post('/log_in/gi',signInController.checkEmployeeExist)





module.exports= admin
