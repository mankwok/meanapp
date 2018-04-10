const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Activity = require('../models/activity');

const userAuthMw = require('../middleware/user-auth-middleware');

router.use(userAuthMw);

router.get('/all', (req, res) => {
    Activity.find({}, (err, activity) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!activity) {
          res.json({ success: false, message: 'No activity found' });
        } else {
          res.json({ success: true, activity: activity });
        }
      }
    }).sort({ _id: -1 });
  });

module.exports = router;