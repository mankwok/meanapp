const jwt = require('jsonwebtoken');
const config = require("../config/database");

module.exports = (req, res, next) => {
  const token = req.headers['token'];
  if (!token) {
    res.json({ success: false, message: 'No auth token' });
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Auth token invalid' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};
