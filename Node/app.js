
const env=require('dotenv').config();
const express = require('express')
const {checkPermission}=require('./middleware/aclMiddleware')
const {verifyAuthAdmin}=require('./middleware/middleware')

const app = express();

const adminRoutes=require('./routes/admin.routes')
const userRoutes=require('./routes/user.routes')
const attendanceRoutes=require('./routes/attendance.routes')
const emp_infoRoutes=require('./routes/emp_info.routes')
const salaryRoutes=require('./routes/salary.routes')
const otpRoutes=require('./routes/otp.routes')
const messageRoute=require('./routes/message.routes')
const authRoute=require('./routes/auth.routes')
const cors = require('cors')
app.use(express.json())
app.use(cors())




app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/service1',emp_infoRoutes);
app.use('/salary',salaryRoutes);
app.use('/attendance',attendanceRoutes);
app.use('/otp',otpRoutes);
app.use('/message',messageRoute)
app.use('/auth/',authRoute)





app.listen(process.env.PORT,()=>{
    console.log(`server is running on Port ${process.env.PORT}`);
})




module.exports=app
















