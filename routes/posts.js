const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const Post = require('../models/post');

const userAuthMw = require("../middleware/user-auth-middleware");

router.use(userAuthMw);

router.post('/newPost', (req, res) => {
  if (!req.body.title) {
    res.json({ success: false, message: 'Post title is required.' });
  } else {
    if (!req.body.body) {
      res.json({ success: false, message: 'Post body is required.' });
    } else {
      if (!req.body.createdBy) {
        res.json({ success: false, message: 'Post creator is required.' });
      } else {
        let post = new Post({
          title: req.body.title,
          body: req.body.body,
          createdBy: req.body.createdBy
        });
        post.save((err) => {
            if (err) {
              if (err.errors) {
                if (err.errors.title) {
                  res.json({ success: false, message: err.errors.title.message });
                } else {
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message });
                  } else {
                    res.json({ success: false, message: err });
                  }
                }
              } else {
                res.json({ success: false, message: err });
              }
            } else {
              res.json({ success: true, message: 'Post created!' });
            }
          });
      }
    }
  }
});

router.get('/all', (req, res) => {
  Post.find({}, (err, posts) => {
    if(err){
      res.json({ success: false, message: err });
    } else {
      if(!posts) {
        res.json({ success: false, message: 'No post found.' });
      } else {
        res.json({ success: true, posts: posts });
      }
    }
  }).sort({ '_id': -1 }); 
});


module.exports = router;
