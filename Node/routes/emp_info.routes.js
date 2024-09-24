const express = require('express')
const  emp_info= express.Router();
const {verifyAuthAdmin} = require('../middleware/middleware')
const {checkPermission}=require('../middleware/aclMiddleware')
const checkRole=require('../middleware/checkRole')
const empInfoController=require('../controller/empInfoController')
emp_info.get('/get',verifyAuthAdmin,empInfoController.getData )
emp_info.post('/sort',verifyAuthAdmin,empInfoController.getDataBySort )
emp_info.get('/get/:id',empInfoController.getDataById )
emp_info.delete('/delete/:id',verifyAuthAdmin,checkRole('hr'),empInfoController.deleteData )
emp_info.put('/update/:id',verifyAuthAdmin,empInfoController.updateData )
emp_info.post('/insert',verifyAuthAdmin,checkRole('hr'),empInfoController.insertData)
emp_info.get('/checkRole',verifyAuthAdmin,checkRole('hr'),empInfoController.insertData)
module.exports=emp_info
