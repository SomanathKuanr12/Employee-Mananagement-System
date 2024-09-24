const express = require('express')
const user = express.Router();
const userController=require('../controller/userController')



user.put('/sign_up',userController.userSignUp)
user.post('/log_in',userController.userLogin )
user.put('/change',userController.changePassword)

module.exports=user