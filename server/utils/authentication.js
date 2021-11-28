const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'pveb_showtime';
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' };

// token koji treba proslediti je:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIiwiaWF0IjoxNjE3NzM4NzEzLCJleHAiOjE2MjAzMzA3MTN9.
// h-H96EdSvm_q6PFrKrjPoi-c5akNVgDynrrq1bTblIw

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({ auth: false, message: 'Nije prosledjen token.' });
  }

  jwt.verify(token, jwtSecret, (error, adminData) => {
    if (error) {
      return res
        .status(500)
        .json({ auth: false, message: 'Doslo je do problema prilikom provere tokena.' });
    }
    if (
      adminData.adminUsername != adminUsername ||
      adminData.adminPassword != adminPassword
    ) {
      return res.status(403).json({auth: false, message: 'Pogresno korisnicko ime i/ili sifra'});
    }
    
    next();
  });
};

module.exports = verifyToken;
