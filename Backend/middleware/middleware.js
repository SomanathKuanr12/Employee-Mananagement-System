const jwt = require('jsonwebtoken')

const verifyAuthAdmin = (req,res,next)=>{
    const token  = req.headers['authorization']
    if(!token){
        res.status(406).json({"message": "token not found"})
    }
    
    // Verify the token
    jwt.verify(token.split(' ')[1], 'this is jwt', (err, decoded) => {
        if (err) {
          
            return res.status(401).json({ message: 'Failed to authenticate token' });
        } else {
            const userRole = decoded.code;
            //console.log(userRole);
            const email=decoded.email
            //console.log(email);
            if (userRole === 'admin') {
                //console.log('verified');
                req.user=email;
                next();
            } else {  
                return res.status(413).json({ message: 'You are not authorized to access this resource' });
            }
        }
    });
}

const verifyAuthUser = (req,res,next)=>{
    const token  = req.headers['authorization']
    console.log(token);
    if(!token){
        res.status(404).json({"message": "token not found"})
    }
    
    // Verify the token
    jwt.verify(token.split(' ')[1], 'this is jwt', (err, decoded) => {
        if (err) {
          
            return res.status(401).json({ message: 'Failed to authenticate token' });
        } else {
            const userRole = decoded.code;
            if (userRole === 'user') {
                //console.log('verified');
                next();
            } else {  
                return res.status(403).json({ message: 'You are not authorized to access this resource' });
            }
        }
    });
}

module.exports = {
    verifyAuthAdmin,
    verifyAuthUser
}