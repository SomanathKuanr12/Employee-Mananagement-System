const express = require('express')
const salary= express.Router();
const {verifyAuthUser } =require('../middleware/middleware')
const salaryController=require('../controller/salaryController')
salary.get('/get/:email',verifyAuthUser,salaryController.getSalary)

module.exports=salary