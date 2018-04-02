const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const config = require('../config/database');

const userAuthMw = require('../middleware/user-auth-middleware');

router.use(userAuthMw);

router.get('/', (req, res) => {
  User.findOne({ _id: req.decoded.userId })
    .select('username email engName position department')
    .exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({ succes: false, message: 'User not found' });
        } else {
          Post.count({ createdBy: user.username }, function(err, c) {
            res.json({ success: true, user: user, postCount: c });
          });
        }
      }
    });
});

module.exports = router;
