const con=require('../config')

function getSalary(req, resp){
    const email = req.params.email
    con.query("select e.id,e.name,e.email,e.salary,a.totalPresent from emp_info as e INNER JOIN attendance as a on e.email=a.email where e.email=?",[email], (err, res) => {
        if (err) {
            resp.status(406).json({ message: 'Invalid email' })
        }
        if (res) {
            resp.send(res)
        }
    })
}
module.exports={getSalary}