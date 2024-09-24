const express = require('express')
const attendance= express.Router();
const attendanceController=require('../controller/attendanceController')
const {verifyAuthUser } =require('../middleware/middleware')
attendance.put('/update',verifyAuthUser,attendanceController.updateAttendance)
attendance.get('/get/:email',attendanceController.attendanceData)

module.exports=attendance