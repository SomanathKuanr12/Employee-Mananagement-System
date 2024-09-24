const express=require('express');
const messageRoute=express.Router();
const mailController=require('../controller/nodemailer')

messageRoute.get('/:email',mailController.sendInfoMessage)
messageRoute.post('/',mailController.resetPassword)
messageRoute.post('/validate',mailController.validate)
module.exports=messageRoute;