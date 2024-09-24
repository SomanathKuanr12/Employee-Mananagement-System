const con=require('../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function adminSignUp(req, resp){
    const { name, email, password } = req.body
    bcrypt.hash(password, 6, (err, hash) => {
        if (err)
            resp.end(err)
        else {
            con.query("INSERT INTO registration2 VALUE(?,?,?)", [name, email, hash], (err, res) => {
                if (err) {
                    resp.status(405).json({message:"error in db"})
                }
                else {
                    resp.send(res);
                }
            })
        }
    })
}

function loginWithFacebook(req,resp){
    const {email}=req.body
    console.log(email);
    con.query("select * from registration2 where email=?", [email], (err, res) => {
        if(err){
            console.log(err);
            resp.status(405).json({message:"error in db"})
        }
        else {
            if (res.length > 0) {
                console.log(res);
                resp.send(res);
            } else {
                resp.status(406).json({ message: "Unregistered admin" });
            }
        }
    })

}

function adminLogIn(req, resp){
    const email = req.body.email
    const password = req.body.password
    //console.log(req.body);
    //const { name, email, password } = req.body
    con.query("select * from registration2 where email=?", [email], (err, res) => {
        if (err) {
            resp.send(err)
        }
        else {
            if (res.length < 1)  //if the result array is empty
            {
                resp.status(405).json({ message: 'Unregistered user' });
                return;
            }
            else {

                bcrypt.compare(password, res[0].password, (err, result) => {
                    if (!result) //if password does not match
                    {
                        resp.status(401).json({ message: 'Password does not match' });
                        return;
                    }
                    if (result) //if password match
                    {
                        const token = jwt.sign({  //payload
                            email: res[0].email,
                            code: 'admin',
                        },
                        'this is jwt',  // Secret key
                        { expiresIn: "1h" }  //optional expire time
                        );
                        //console.log(token);
                        resp.status(200).json({ message: `Admin login successfully`, token: token, email: email });
                    }
                })
            }
        }
    })
}

function changePassword(req, resp){
    const { oldPassword, newPassword, email } = req.body
    //console.log(email)
    if(newPassword=='')
    {
        resp.status(406).json({ message: 'new password field is empty' });
        return;
    }
    if (oldPassword == newPassword)  //if new password and old password are same
    {
        resp.status(405).json({ message: 'old password and new password are same' });
        return;
    }
    con.query("select * from registration2 where email=?", [email], (err, res) => {
        if (err) {
        resp.status(403).json({message:'error in db'})
        }
        else {
            if (res.length < 1)  //if the result array is empty
            {
                resp.status(403).json({ message: 'email id does not exist' });
                return;
            }
            else {
                const hash=bcrypt.hashSync(newPassword,6);
                bcrypt.compare(oldPassword, res[0].password, (err, result) => {
                    if (!result) //if password does not match
                    {
                        resp.status(401).json({ message: 'old Password does not match' });
                        return;
                    }
                    if (result) //if password match  
                    {
                    con.query("UPDATE registration2 SET password=?  where email=?", [hash, email], (err, res) => {
                    if (err) {
                        resp.status(407).json({ message: 'error in DB' });
                        return;
                    }
                    if (res) {
                        resp.status(200).json({ message: 'Password updated successfully' });
                    }
                })
            }
      })
   }
}

})
}


module.exports={
    adminSignUp,
    adminLogIn,
    loginWithFacebook,
    changePassword
}