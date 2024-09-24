const con=require('../config')

function attendanceData(req, resp){
    const email= req.params.email
    con.query("select totalPresent from attendance where email=?",[email], (err, res) => {
        if (err) {
            resp.status(406).json({ message: 'Invalid Email' })
        }
        else {
            if (res) {
                return resp.send(res)
            }
        }
    })
}

    function updateAttendance(req, resp){
        const { date,email, totalPresent } = req.body
        const currentDate=new Date(date);
        console.log(currentDate);
        con.query("select date from attendance where email=?",[email],(errr,result)=>{
            if(errr)
            {
               return resp.status(410).json({ message: "Employee email not found" });
            }
            else
            {
                if(result){
                    const oldDate=new Date(result[0].date)
                    console.log(oldDate);
                    if(currentDate<=oldDate )
                    {
                        return resp.status(411).json({ message: "Attendance is already updated" });
                    }
                    else
                    {
                        con.query("UPDATE attendance SET totalPresent=?,date=? where email=?", [totalPresent,currentDate, email], (err, res) => {
                            if (err) {
                                resp.status(412).json({ message: "Employee email not found" });
                            }
                            if (res) {
                                resp.status(202).json({ message: "successfully updated" })
                            }
                        })
                    }
                 }
            }
        })
           
    }

module.exports={attendanceData,updateAttendance}