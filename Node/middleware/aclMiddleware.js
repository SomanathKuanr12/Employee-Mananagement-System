const acl=require('acl')
const con=require('../config') 
const aclInstance = new acl(new acl.memoryBackend());

// Define roles and permissions
aclInstance.allow([

  {
    roles: ['hr'],
    allows: [
     { resources: '/sign_up', permissions: ['post'] }
      
    ]
  }
]);

// Middleware function to enforce ACL
const checkPermission = (req, res, next) => {
  // Get user role from request (e.g., from JWT token)
  const email = req.user;  // Assuming user role is stored in req.user.role
  console.log(email);
  con.query('SELECT role from adminRole where email=?',[email],(err,result)=>{
    //console.log(result);
    if(err)
        {
            console.log(err);
            res.status(405).status({message:'error in db'})
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Role not found' });
          }
          const userRole = result[0].role;
          aclInstance.isAllowed(userRole, req.path, req.method.toLowerCase(), (err, allowed) => {
            if (err) {
              // Error occurred, return internal server error
              return res.status(500).json({ error: 'Internal Server Error', message: err.message });
            }
        
            if (allowed) {
              // User has permission, proceed to the next middleware or route handler
              next();
            } else {
              // User does not have permission, return forbidden error
              res.status(403).json({ error: 'Forbidden', message: 'You do not have permission to access this resource' });
            }
          });
  }); 
};

module.exports={checkPermission}
