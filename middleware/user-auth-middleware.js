const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    return (req, res, next) => {
      console.log(req);
        const token = req.headers["token"];
        if (!token) {
          res.json({ success: false, message: "No auth token" });
        } else {
          console.log("Have token");
          jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              res.json({ success: false, message: "Auth token invalid" });
            } else {
              req.decoded = decoded;
              next();
            }
          });
        }
    }
  }