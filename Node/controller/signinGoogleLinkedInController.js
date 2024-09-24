const axios=require('axios')
const con=require('../config')

const checkEmployeeExist=(req,resp)=>{
     resp.redirect('http://localhost:4200/user');
}



//////////////////for linkedin
// const clientID = '86uk6sjza3fy48';
// const clientSecret = 'WPL_AP0.JDSnv9jj4SuxO6oC.MzA1MTkxMjk0NQ==';
// const redirectUri = 'http://localhost:4100/auth/linkedin/callback';
// async function linkedin(req, res){
//     const passport = require('passport');
//     const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
//     const User = require('./models/user'); // Adjust the path as necessary
    
//     passport.use(new LinkedInStrategy({
//         clientID: '86uk6sjza3fy48',
//         clientSecret:'WPL_AP0.JDSnv9jj4SuxO6oC.MzA1MTkxMjk0NQ==',
//         callbackURL: "http://localhost:4100/auth/linkedin/callback",
//         scope: ['r_emailaddress', 'r_liteprofile'],
//         state: true
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           const email = profile.emails[0].value;
//           let user = await con.query(`SELECT * FROM registarion where email=${email}`)
//           console.log(user);
//           if (user) {
//             return done(null, user);
//           } else {
//             return done(null, false, { message: 'Unauthorized user' });
//           }
//         } catch (err) {
//           return done(err);
//         }
//       }
//     ));
    
//     passport.serializeUser((user, done) => {
//       done(null, user.id);
//     });
    
//     passport.deserializeUser((id, done) => {
//       User.findById(id, (err, user) => {
//         done(err, user);
//       });
//     });
// }    


// const passport = require('passport');

// const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


// passport.use(new LinkedInStrategy({
//     clientID: '86uk6sjza3fy48',
//     clientSecret: 'WPL_AP0.JDSnv9jj4SuxO6oC.MzA1MTkxMjk0NQ==',
//     callbackURL: "http://localhost:4100/auth/linkedin/callback",
//     scope: ['r_emailaddress', 'r_liteprofile'],
//     state: true
//   },
//   (accessToken, refreshToken, profile, done) => {
//     try {
//       const email = profile.emails[0].value;
//       con.query('SELECT * FROM registration WHERE email = ?', [email], (err, results) => {
//         console.log(results);
//         if (err) return done(err);
//         if (results.length > 0) {
//           return done(null, results[0]);
//         } else {
//           return done(null, false, { message: 'Unauthorized user' });
//         }
//       });
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   con.query('SELECT * FROM registration WHERE id = ?', [id], (err, results) => {
//     if (err) return done(err);
//     done(null, results[0]);
//   });
// });




const linkedinCallback = (req, res) => {
    // Successful authentication, redirect home.
    console.log("controller called");
    res.redirect('http://localhost:4200/admin');
  };
  
  module.exports = {
    linkedinCallback,
    checkEmployeeExist
  };
  