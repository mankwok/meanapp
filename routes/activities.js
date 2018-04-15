const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Activity = require('../models/activity');

const userAuthMw = require('../middleware/user-auth-middleware');

router.use(userAuthMw);

router.post('/activity-create', (req, res) => {
  let activity = new Activity({
    name: req.body.name,
    type: req.body.type,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    applicationDeadline: req.body.applicationDeadline,
    venue: req.body.venue,
    vacancies: req.body.vacancies,
    detail: req.body.detail,
    minParticipants: req.body.minParticipants,
    createUser: req.body.createUser
  });

  activity.save(err => {
    if (err) {
      console.log(err);
      if (err.errors) {
        if (err.errors.title) {
          res.json({ success: false, message: err.errors.title.message });
        } else {
          if (err.errors.body) {
            res.json({
              success: false,
              message: err.errors.body.message
            });
          } else {
            res.json({ success: false, message: err });
          }
        }
      } else {
        res.json({ success: false, message: err });
      }
    } else {
      res.json({ success: true, message: 'Activity created' });
    }
  });
});


router.put('/activity-bookmark', (req, res) => {
  if (!req.body.id) {
    res.json({ success: false, message: 'No Activity id' });
  } else {
    Activity.findOne({ _id: req.body.id }, (err, activity) => {
      if (err) {
        res.json({ success: false, message: 'Invalid Activity id' });
      } else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Invalid user id' });
          } else {
            if (!user) {
              res.json({ success: false, message: 'User not found' });
            } else {
              if (activity.bookmarkUsers.includes(user.username)) {
                const index = activity.bookmarkUsers.indexOf(user.username);
                activity.bookmarkUsers.splice(index, 1);
                activity.save(err => {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Unable to bookmark'
                    });
                  } else {
                    res.json({ success: true, message: 'Bookmark removed' });
                  }
                });
              }
              else {
                activity.bookmarkUsers.push(user.username);
                activity.save(err => {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Something went wrong'
                    });
                  } else {
                    res.json({ success: true, message: 'Bookmark done' });
                  }
                });
              }
            }
          }
        });
      }
    });
  }
});


router.put('/activity-not_intereted', (req, res) => {
  if (!req.body.id) {
    res.json({ success: false, message: 'No Activity id' });
  } else {
    Activity.findOne({ _id: req.body.id }, (err, activity) => {
      if (err) {
        res.json({ success: false, message: 'Invalid Activity id' });
      } else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Invalid user id' });
          } else {
            if (!user) {
              res.json({ success: false, message: 'User not found' });
            } else {
              if (activity.notInterestedUsers.includes(user.username)) {
                const index = activity.notInterestedUsers.indexOf(user.username);
                activity.notInterestedUsers.splice(index, 1);
                activity.save(err => {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Unable to remove uninterested'
                    });
                  } else {
                    res.json({ success: true, message: 'Not interested removed' });
                  }
                });
              }
              else {
                activity.notInterestedUsers.push(user.username);
                activity.save(err => {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Something went wrong'
                    });
                  } else {
                    res.json({ success: true, message: 'Not interested set' });
                  }
                });
              }
            }
          }
        });
      }
    });
  }
});




router.put('/activity-join', (req, res) => {
  if (!req.body.id) {
    res.json({ success: false, message: 'No Activity id' });
  } else {
    Activity.findOne({ _id: req.body.id }, (err, activity) => {
      if (err) {
        res.json({ success: false, message: 'Invalid Activity id' });
      } else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Invalid user id' });
          } else {
            if (!user) {
              res.json({ success: false, message: 'User not found' });
            } else {
              if (activity.participants.includes(user.username)) {
                const index = activity.participants.indexOf(user.username);
                activity.participants.splice(index, 1);
                activity.save(err => {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Unable to leave'
                    });
                  } else {
                    res.json({ success: true, message: 'Application cancelled' });
                  }
                });
              }
              else {
                if (activity.participants.length < activity.vacancies && new Date() <= new Date(activity.applicationDeadline)) {
                  activity.participants.push(user.username);
                  activity.save(err => {
                    if (err) {
                      res.json({
                        success: false,
                        message: 'Something went wrong'
                      });
                    } else {
                      res.json({ success: true, message: 'Activity joined' });
                    }
                  });
                } else {
                  res.json({ success: false, message: 'Application failed' });
                }
              }
            }
          }
        });
      }
    });
  }
});


router.get('/all', (req, res) => {
  Activity.find({}, (err, activity) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      if (!Activity) {
        res.json({ success: false, message: 'No activity found' });
      } else {
        res.json({ success: true, activity: activity });
      }
    }
  }).sort({ startDate: -1 });
});


router.get('/single/:id', (req, res) => {
  if (!req.params.id) {
    res.json({ success: false, message: 'Invalid activity id' });
  } else {
    Activity.findOne({ _id: req.params.id }, (err, Activity) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!Activity) {
          res.json({ success: false, message: 'No activity found' });
        } else {
          res.json({ success: true, Activity: Activity });
        }
      }
    }).sort({ _id: -1 });
  }
});


router.get('/bookmark/:id', (req, res) => {
  if (!req.params.id) {
    res.json({ success: false, message: 'Invalid user id' });
  } else {
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      if (err) {
        res.json({ success: false, message: 'Invalid user id' });
      } else {
        if (!user) {
          res.json({ success: false, message: 'User not found' });
        } else {
          Activity.find({ bookmarkUsers: { $eq: req.params.id } }, (err, activity) => {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              if (!Activity) {
                res.json({ success: false, message: 'No activity found' });
              } else {
                res.json({ success: true, activity: activity });
              }
            }
          }).sort({ startDate: -1 });
        }
      }
    });
  }
  /*
      Activity.findOne({ _id: req.params.id }, (err, Activity) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (!Activity) {
            res.json({ success: false, message: 'No activity found' });
          } else {
            res.json({ success: true, Activity: Activity });
          }
        }
        */
});


module.exports = router;