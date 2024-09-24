const con=require('../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSignUp=(req, resp)=>{
    const { name, email, password } = req.body
    console.log(name);
    console.log(email);
    con.query("SELECT * FROM registration WHERE name=? AND email=?",[name,email],(err,result)=>{
        if(err)
        {
            resp.status(407).json({message:'error in db'})
        }
        else if(result.length<1)
        {
            resp.status(409).json({message:'Employee  does not exist'})
        }
        else{
                bcrypt.hash(password, 6, (err, hash) => {
                    if (err)
                        {
                            resp.status(408).json({message:'error in bcrypt'})
                        }
                    else {
                        con.query("UPDATE registration SET password=? WHERE email=?", [hash,email], (err, res) => {
                            if (err) {
                                resp.status(408).json({message:'error in registration'})
                            }
                            else {
                                resp.status(208).json({message:'Password created Successfully'})
                            }
                        })
                    }
                })
            }
    })
}


const userLogin=(req, resp)=>{
    const email = req.body.email
    console.log(email);
    const password = req.body.password
    con.query("select * from registration where email=?", [email], (err, res) => {
        if (err) {
            console.log(err);
            resp.status(406).json("error in db");
        }
        else {
            if (res.length < 1)  //if the result array is empty
            {
                resp.status(403).json({ message: 'Unregistered user' });
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
                        const token = jwt.sign({
                            data: res[0].email,
                            code: 'user' //user data that you want to pass
                        },
                            'this is jwt',  //secret code
                            { expiresIn: "1h" }  //expires in
                        );
                        resp.status(200).json({ message: `User login successfully`, token: token, email: email });
                    }
                })
            }
        }
    })
}

const changePassword=(req, resp)=>{
    const { oldPassword, newPassword, email } = req.body
    console.log(email)
    if(newPassword=='')
    {
        resp.status(405).json({ message: 'new password field is empty' });
        return;
    }
    if (oldPassword == newPassword)  //if new password and old password are same
    {
        resp.status(405).json({ message: 'old password and new password are same' });
        return;
    }
    con.query("select * from registration where email=?", [email], (err, res) => {
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
                    con.query("UPDATE registration SET password=?  where email=?", [hash, email], (err, res) => {
                    if (err) {
                        resp.status(407).json({ message: 'error in DB' });
                        return;
                    }
                    if (res) {
                        resp.status(201).json({ message: 'Password updated successfully' });
                    }
                })
            }
    })
  }
}

})
}

module.exports={
    userLogin,
    userSignUp,
    changePassword
}
