const rateLimit = require('express-rate-limit');
const { response } = require('../app');


// const loginLimiter = rateLimit({
//   windowMs:  2* 60 * 1000, // 2 minutes window
//   max: 2, 
//   handler:(req,resp)=>{
//     resp.status(429).json({message: 'Too many login attempts from this IP, please try again after 2 minutes'})
//   },
//   requestWasSuccessful:(request,response)=>response.statusCode<400,
//   skipSuccessfulRequests:true
// });

const userLoginAttempts = {};

const loginLimiter = (req, res, next) => {
  const userId = req.body.email; 
  const userAttempts = userLoginAttempts[userId] || { count: 0, lastAttempt: 0 };

  const now = Date.now();
  const timeWindow = 2 * 60 * 1000; // 2 minutes window

  if (now - userAttempts.lastAttempt > timeWindow) {
    userAttempts.count = 0; // Reset the count if the time window has passed
  }

  userAttempts.lastAttempt = now;
  userAttempts.count += 1;

  if (userAttempts.count > 2) {
    return res.status(429).json({ message: 'Your account had temporaily blocked due to too many login attempts, please try again after 2 minutes' });
  }

  userLoginAttempts[userId] = userAttempts;
  next();
};



  



module.exports = loginLimiter;
