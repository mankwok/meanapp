const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

const userAuthMw = require('../middleware/user-auth-middleware');

router.use(userAuthMw);

router.post('/newPost', (req, res) => {
  if (!req.body.title) {
    res.json({ success: false, message: 'Post title is required' });
  } else {
    if (!req.body.body) {
      res.json({ success: false, message: 'Post body is required' });
    } else {
      User.findOne({ _id: req.decoded.userId }, (err, user) => {
        if (err) {
          res.json({ success: false, message: 'Invalid user id' });
        } else {
          if (!user) {
            res.json({ success: false, message: 'Post creator is required' });
          } else {
            let post = new Post({
              title: req.body.title,
              body: req.body.body,
              createdBy: user._id
            });
            post.save(err => {
              if (err) {
                if (err.errors) {
                  if (err.errors.title) {
                    res.json({
                      success: false,
                      message: err.errors.title.message
                    });
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
                res.json({ success: true, message: 'Post created' });
              }
            });
          }
        }
      });
    }
  }
});

router.get('/all', (req, res) => {
  Post.find({})
    .sort({ _id: -1 })
    .populate('createdBy', 'engName')
    .populate('comments.commentBy', 'engName')
    .exec((err, posts) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!posts) {
          res.json({
            success: false,
            message: 'No posts found'
          });
        } else {
          res.json({ success: true, posts: posts });
        }
      }
    });
});

router.get('/single/:id', (req, res) => {
  if (!req.params.id) {
    res.json({ success: false, message: 'Invalid post id' });
  } else {
    Post.findOne({ _id: req.params.id })
      .populate('createdBy', 'engName')
      .populate('comments.commentBy', 'engName')
      .populate('likedBy', 'engName')
      .exec((err, post) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (!post) {
            res.json({ success: false, message: 'No post found' });
          } else {
            res.json({ success: true, post: post });
          }
        }
      });
  }
});

router.post('/comment', (req, res) => {
  if (!req.body.comment) {
    res.json({ success: false, message: 'No comment inputted' });
  } else {
    if (!req.body.id) {
      res.json({ success: false, message: 'No post id' });
    } else {
      Post.findOne({ _id: req.body.id }, (err, post) => {
        if (err) {
          res.json({ success: false, message: 'Invalid post id' });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: 'Invalid user id' });
            } else {
              if (!user) {
                res.json({ success: false, message: 'User not found' });
              } else {
                post.comments.push({
                  comment: req.body.comment,
                  commentBy: user._id
                });
                post.save(err => {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Something went wrong'
                    });
                  } else {
                    res.json({ success: true, message: 'Comment posted' });
                  }
                });
              }
            }
          });
        }
      });
    }
  }
});

router.put('/likePost', (req, res) => {
  if (!req.body.id) {
    res.json({ success: false, message: 'No post id' });
  } else {
    Post.findOne({ _id: req.body.id }, (err, post) => {
      if (err) {
        res.json({ success: false, message: 'Invalid post id' });
      } else {
        if (!post) {
          res.json({ success: false, message: 'Invalid post id' });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: 'Invalid user id' });
            } else {
              if (!user) {
                res.json({ success: false, message: 'User not found' });
              } else {
                var isInArray = post.likedBy.some(function(likeBy) {
                  return likeBy.equals(user._id);
                });
                if (isInArray) {
                  const index = post.likedBy.indexOf(user._id);
                  post.likedBy.splice(index, 1);
                  post.save(err => {
                    if (err) {
                      res.json({
                        success: false,
                        message: 'Something went wrong'
                      });
                    } else {
                      res.json({ success: true, message: 'Post unliked' });
                    }
                  });
                } else {
                  post.likedBy.push(user._id);
                  post.save(err => {
                    if (err) {
                      res.json({
                        success: false,
                        message: 'Something went wrong'
                      });
                    } else {
                      res.json({ success: true, message: 'Post liked' });
                    }
                  });
                }
              }
            }
          });
        }
      }
    });
  }
});

module.exports = router;
