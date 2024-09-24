

const con = require('../config');

const checkRole = (role) => {
  return (req, res, next) => {
    const email = req.user; // Ensure you are getting the user's email correctly from req.user
    con.query(`SELECT role FROM adminRole WHERE email=?`, [email], (err, result) => {

      if (err) {
        return res.status(500).json({ message: 'Error in database' });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Role not found' });
      }
      const userRole = result[0].role;
      if (userRole !== role) {
        return res.status(406).json({ message: 'You do not have permission to perform this action' });
      }     
      next();
    });
  };
};

module.exports = checkRole;




