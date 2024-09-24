
const nodemailer = require('nodemailer');
const con = require('../config')
const { google } = require('googleapis');
const bcrypt = require('bcrypt')
const crypto=require('crypto');
const { error } = require('console');

let randomNumber = 0;
let expirationTime='';
let currentEmail = '';

const sendEmail = (req, resp) => {
    const { email } = req.body;
    currentEmail = email;    
    con.query('select * from registration where email=?', [currentEmail], (err, result) => {
        if (err) {
            resp.status(408).json({ message: 'error in finding email ' })
        }
        else if (result.length < 1) {
            resp.status(409).json({ message: 'Employee  does not exist' })
        }
        else {
        let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'somanathkuanr12@gmail.com',
            pass: 'wthb ipqm gcgc spig'
        }
    });
    randomNumber = Math.floor(Math.random() * ((999999 - 100000) + 1)) + 100000;
   console.log(randomNumber);
        const currentTime = new Date().getTime();
        expirationTime = currentTime + 1 * 60 * 1000; 
        //console.log(expirationTime);
    
    let mailOptions = {
        from: 'somanathkuanr12@gmail.com',
        to: email,
        subject: 'OTP for Reseting password',
        html: `<h4> otp for reseting  your password is: ${randomNumber} </h4><br><br><strong style="color: red;">WARNINGS: Please do not share otp with others...</strong> `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            resp.status(405).json({ message: "otp can not sended" });
        } else {
           // resp.send(true)
            con.query("insert into otpTable (email,otp) values (?,?)",[email,randomNumber],(err,res)=>{
                if(err)
                {
                    resp.status(406).json({ message: "error during storing otp" });
                }
                else
                {
                    // resp.status(200).json({ message: 'otp sent successfully' })
                    //resp.send(true)
                    resp.json({
                        isSent:true,
                        otp:randomNumber
                    });
                }
            })
        }
    });

    
   }
  })
}

const verifyOtp = (req, resp) => {
    const otp = req.params.otp;
    const email=req.params.email;
    const currentTime = new Date().getTime();
    console.log(expirationTime);
    console.log(randomNumber);
    console.log(otp);
    // if (expirationTime >= currentTime) {
    //     if (randomNumber == otp) {
    //         resp.send(true);
    //     } else {
    //         resp.status(405).json({ message: "otp does not match" });
    //     }
    // } else {
    //     resp.status(406).json({ message: "otp expired" });
    // }
    con.query("select * from otpTable where otp=? and email=?",[otp,email],(err,res)=>{
        if(err)
        {
            resp.status(405).json({ message: "error during finding otp in db" });
        }
        else if(res.length<1)
        {
            resp.status(405).json({ message: "otp does not match" });
        }
        else{
            con.query("Update otpTable set isVerified=1 where email=?",[email],(errr,results)=>
            {
                if(errr)
                {
                    resp.status(405).json({ message: "error  in db" });
                }
                if(results){
                   // resp.status(200).json({ message: "otp successfully verified" })
                    resp.send(true);
                }
            })
        }
        
    })
}

const updatePassword = (req, resp) => {
    const { password, email } = req.body;

    console.log(password);
    if (password == '') {
        resp.status(406).json({ message: "Password should not be empty" });
    } else {
        con.beginTransaction((err) => {
            if (err) {
                resp.status(401).json({ message: 'Error in beginning transaction' });
            } else {
                con.query('SELECT * FROM registration WHERE email=?', [email, password], (err, result) => {
                    if (err) {
                        con.rollback(() => {
                            resp.status(401).json({ message: 'Error in finding email' });
                        });
                    } else if (result.length < 1) {
                        con.rollback(() => {
                            resp.status(409).json({ message: 'Employee does not exist' });
                        });
                    } else {
                        bcrypt.hash(password, 6, (err, hash) => {
                            if (err) {
                                con.rollback(() => {
                                    resp.status(402).json({ message: 'Error in bcrypt' });
                                });
                            } else {
                                con.query("UPDATE registration SET password=? WHERE email=?", [hash, email], (err, res) => {
                                    if (err) {
                                        con.rollback(() => {
                                            resp.status(403).json({ message: 'Error in registration' });
                                        });
                                    }
                                    con.query("DELETE FROM otpTable WHERE email=?", [email], (err, result) => {
                                        if (err) {
                                            con.rollback(() => {
                                                resp.status(405).json({ message: 'Error in deleting otp' });
                                            });
                                        } else {
                                            con.commit((err) => {
                                                if (err) {
                                                    con.rollback(() => {
                                                        resp.status(405).json({ message: 'Error in commit' });
                                                    });
                                                } else {
                                                    resp.status(200).json({ message: 'Password updated successfully' });
                                                }
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};






async function sendInfoMessage(req, resp) {
    try {
        const email = req.params.email;
        const credentials = {
                    client_id: '14345218641-tqqmd97ihmnkd0e66e8nd2kmt7gi5avi.apps.googleusercontent.com',
                    client_secret: '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',
                    redirect_uris: ['https://developers.google.com/oauthplayground']
                  
                  };
        const oAuth2Client = new google.auth.OAuth2(
            credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]
        );
       
        const refreshToken = '1//04L0-xyp5wFiiCgYIARAAGAQSNwF-L9IrZXbQsTYKbihf8iHdaelm8NlyOzbOwpgOLN1_UzOioF6SclNVjeSUoKHAYkTS9aBdaEE';
 
 
   const auth=oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.compose']
  });
 //console.log(auth);
  oAuth2Client.setCredentials({refresh_token:refreshToken})
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
        
        //to encrypt the email
        function encryptEmail(email, key) {
            const cipher = crypto.createCipher('aes-256-cbc', key);
            let encrypted = cipher.update(email, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        } 
        const encryptionKey = crypto.randomBytes(32).toString('hex');
        const encryptedEmail = encryptEmail(email, encryptionKey);

        encodedEmail=encodeURIComponent(encryptedEmail)
        encodedKey=encodeURIComponent(encryptionKey)
        const resetPasswordLink = `http://localhost:4200/reset_password?encryptedEmail=${encodeURIComponent(encryptedEmail)}&key=${encodeURIComponent(encryptionKey)}`;
        con.query("INSERT INTO validation VALUES (?,?)",[encodedEmail,encodedKey],(err,res)=>{
            if(err)
            {
                resp.status(409).json({ message: 'Error in DB' });
            }
            if(res)
            {
                resp.status(204);
            }
        })
        
        const raw = makeBody('somanathkuan12@gmail.com', email, 'Greeting from Oditek',`<p>Welcome to Oditek, Kindly reset your password by clicking this link:</p><br><a href="${resetPasswordLink}">Click here to reset</a>`);
        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: raw
            }
        });

        //console.log('Message sent successfully:', res.data);
        resp.send(res.data);
    } catch (err) {
        console.error('Error in sending mail:', err.message);
        resp.status(408).json({ message: 'error in sending mail' });
    }
}

// Helper function to create email body
function makeBody(from, to, subject, message) {
    const str = [
        `From: ${from}`,
        `To: ${to}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset="UTF-8"',
        '', // Add an empty line to separate headers from the message body
        `${message}`
    ].join('\n');
    const encodedMail = Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}




const resetPassword = (req, resp) => {
    const { email, key, password } = req.body;
    
    let userEmail = '';

    try {
        const decipher = crypto.createDecipher('aes-256-cbc', key);
        let decrypted = decipher.update(email, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        userEmail = decrypted;
        console.log('Decrypted Email:', userEmail);


        con.query('select * from registration where email=?', [userEmail], (err, result) => {
            if (err) {
                resp.status(408).json({ message: 'error in finding email '})
            }
            else if (result.length < 1) {
                resp.status(409).json({ message: 'Employee  does not exist' })
            }
            else if(result[0].password !=null)
            {
                resp.status(406).json({ message: 'password is already created',isAlreadyUpdated:true});
            }
            else { 
                console.log(result[0].password);
                bcrypt.hash(password, 6, (err, hash) => {
                    if (err) {
                        resp.status(408).json({ message: 'error during hashing' })
                    }
                    else {
                        con.query("UPDATE registration SET password=? WHERE email=?", [hash, userEmail], (err, res) => {
                            if (err) {
                                resp.status(408).json({ message: 'error in registration' })
                            }
                            if (res) {
                                con.query("DELETE FROM validation where encodedEmail=?",[email],(err,result1)=>{
                                    if(err)
                                    {
                                        resp.status(408).json({ message: 'error in deleting validation' })
                                    }
                                    if(res)
                                    {
                                        resp.send(true);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
         
    } catch (error) {
        console.error('Error decrypting email:', error);
        return resp.status(500).json({ message: 'Error decrypting email' });
    }
}


const validate=(req,resp)=>{
    const {email,key} =req.body
    {        
        console.log(email);
        console.log(key);
        con.query("SELECT * FROM validation where encodedEmail=? and Encodedkey=?",[email,key],(err,res)=>{
            console.log(res);
            if(err)
            {
                resp.status(410).json({ message: 'Error in db' });
            }
           else if(res.length<1)
            {
                resp.send(false);
            }
            else{
                resp.send(true);
            }
        })
    }
}




module.exports = {
    sendEmail,
    verifyOtp,
    updatePassword,
    sendInfoMessage,
    resetPassword,
    validate
}