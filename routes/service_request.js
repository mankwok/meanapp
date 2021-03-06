const express = require('express');
const router = express.Router();

const User = require('../models/user');
const ServiceRequest = require('../models/serviceRequest');
const ServiceRequestItem = require('../models/serviceRequestItem');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userAuthMw = require('../middleware/user-auth-middleware');

router.use(userAuthMw);

router.get('/all', (req, res) => {
  User.findOne({ _id: req.decoded.userId }, (err, user) => {
    if (err) {
      res.json({ success: false, message: 'Invalid user id' });
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found' });
      } else {
        ServiceRequest.find({ createdBy: user._id })
          .sort({ _id: -1 })
          .populate('requestItem', 'name')
          .exec(function(err, serviceRequests) {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              if (!serviceRequests) {
                res.json({
                  success: false,
                  message: 'No service request found'
                });
              } else {
                res.json({ success: true, serviceRequests: serviceRequests });
              }
            }
          });
      }
    }
  });
});

router.get('/allForAdmin', (req, res) => {
  User.findOne({ _id: req.decoded.userId }, (err, user) => {
    if (err) {
      res.json({ success: false, message: 'Invalid user id' });
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found' });
      } else {
        ServiceRequest.find({})
          .sort({ _id: -1 })
          .populate('createdBy', 'engName')
          .populate('requestItem', 'name')
          .exec((err, serviceRequests) => {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              if (!serviceRequests) {
                res.json({
                  success: false,
                  message: 'No service request found'
                });
              } else {
                res.json({ success: true, serviceRequests: serviceRequests });
              }
            }
          });
      }
    }
  });
});

router.get('/requestItems', (req, res) => {
  ServiceRequestItem.find({})
    .populate('createdBy', 'engName')
    .populate('modifiedBy', 'engName')
    .sort({ name: 1 })
    .exec((err, serviceRequestItems) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!serviceRequestItems) {
          res.json({
            success: false,
            serviceRequestItem: 'No request item found'
          });
        } else {
          res.json({ success: true, serviceRequestItems: serviceRequestItems });
        }
      }
    });
});

router.get('/requestItem/:id', (req, res) => {
  ServiceRequestItem.findOne({ _id: req.params.id })
    .populate('createdBy', 'engName')
    .sort({ name: 1 })
    .exec((err, serviceRequestItem) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!serviceRequestItem) {
          res.json({
            success: false,
            serviceRequestItem: 'No request item found'
          });
        } else {
          res.json({ success: true, serviceRequestItem: serviceRequestItem });
        }
      }
    });
});

router.post('/newServiceRequestItem', (req, res) => {
  if (!req.body.requestType) {
    res.json({ success: false, message: 'No request type inputted' });
  } else {
    if (!req.body.name) {
      res.json({ success: false, message: 'No name inputted' });
    } else {
      if (!req.body.stock) {
        res.json({ success: false, message: 'No stock inputted' });
      } else {
        if (req.body.stock < 0) {
          res.json({ success: false, message: 'Stock cannot be negative' });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: 'Invalid user id' });
            } else {
              if (!user) {
                res.json({ success: false, message: 'User not found' });
              } else {
                ServiceRequestItem.findOne(
                  { name: req.body.name.toLowerCase() },
                  (err, serviceRequestItem) => {
                    if (err) {
                      res.json({
                        success: false,
                        message: 'Error in getting item'
                      });
                    } else {
                      if (serviceRequestItem) {
                        res.json({
                          success: false,
                          message: 'Item already exist'
                        });
                      } else {
                        let requestItem = new ServiceRequestItem({
                          requestType: req.body.requestType.toUpperCase(),
                          name: req.body.name,
                          stock: req.body.stock,
                          createdBy: user._id
                        });
                        requestItem.save(err => {
                          if (err) {
                            res.json({ success: false, message: err.errors });
                          } else {
                            res.json({
                              success: true,
                              message: 'Request item created'
                            });
                          }
                        });
                      }
                    }
                  }
                );
              }
            }
          });
        }
      }
    }
  }
});

router.put('/setRequestItemStock', (req, res) => {
  if (req.body.stock < 0) {
    res.json({ success: false, message: 'Stock cannot be negative' });
  } else {
    if (!req.body.id) {
      res.json({ success: false, message: 'No item id' });
    } else {
      ServiceRequestItem.findOne(
        { _id: req.body.id },
        (err, serviceRequestItem) => {
          if (err) {
            res.json({ success: false, message: 'Invalid request item id' });
          } else {
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              if (err) {
                res.json({ success: false, message: 'Invalid user id' });
              } else {
                if (!user) {
                  res.json({ success: false, message: 'User not found' });
                } else {
                  serviceRequestItem.stock = req.body.stock;
                  serviceRequestItem.modifiedBy = user._id;
                  serviceRequestItem.modifiedAt = new Date();
                  serviceRequestItem.save(err => {
                    if (err) {
                      res.json({
                        success: false,
                        message: 'Something went wrong'
                      });
                    } else {
                      res.json({ success: true, message: 'Stock updated' });
                    }
                  });
                }
              }
            });
          }
        }
      );
    }
  }
});

router.post('/newServiceRequest', (req, res) => {
  if (!req.body.requestItem) {
    res.json({ success: false, message: 'No request item inputted' });
  } else {
    if (!req.body.requestDesc) {
      res.json({
        success: false,
        message: 'No request description inputted'
      });
    } else {
      if (!req.body.quantity) {
        res.json({ success: false, message: 'No quantity item inputted' });
      } else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Invalid user id' });
          } else {
            if (!user) {
              res.json({ success: false, message: 'User not found' });
            } else {
              ServiceRequestItem.findOne(
                { _id: req.body.requestItem },
                (err, requestItem) => {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Request item not found'
                    });
                  } else {
                    if (!requestItem) {
                      res.json({
                        success: false,
                        message: 'Request item not found'
                      });
                    } else {
                      let serviceRequest = new ServiceRequest({
                        requestType: requestItem.requestType,
                        requestItem: requestItem._id,
                        requestDesc: req.body.requestDesc,
                        quantity: req.body.quantity,
                        createdBy: user._id
                      });
                      serviceRequest.save(err => {
                        if (err) {
                          res.json({ success: false, message: err.errors });
                        } else {
                          res.json({
                            success: true,
                            message: 'Service request created'
                          });
                        }
                      });
                    }
                  }
                }
              );
            }
          }
        });
      }
    }
  }
});

router.put('/approveServiceRequest', (req, res) => {
  if (!req.body.id) {
    res.json({ success: false, message: 'No service request inputted' });
  } else {
    ServiceRequest.findOne({ _id: req.body.id }, (err, serviceRequest) => {
      if (err) {
        res.json({ success: false, message: 'Invalid service request id' });
      } else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Invalid user id' });
          } else {
            if (!user) {
              res.json({ success: false, message: 'User not found' });
            } else {
              ServiceRequestItem.findOne(
                { _id: serviceRequest.requestItem },
                (err, serviceRequestItem) => {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Invalid request item id'
                    });
                  } else {
                    if (!serviceRequestItem) {
                      res.json({
                        success: false,
                        message: 'Invalid request item id'
                      });
                    } else {
                      if (serviceRequest.status == 'APL') {
                        res.json({
                          success: false,
                          message: 'Request is already approved'
                        });
                      } else {
                        if (serviceRequest.requestType != 'O') {
                          if (
                            serviceRequestItem.stock - serviceRequest.quantity <
                            0
                          ) {
                            res.json({
                              success: false,
                              message: 'Not enough stock to approve'
                            });
                          } else {
                            serviceRequestItem.stock =
                              serviceRequestItem.stock -
                              serviceRequest.quantity;
                            serviceRequestItem.save(err => {
                              if (err) {
                                res.json({
                                  success: false,
                                  message:
                                    'Something went wrong in update stock'
                                });
                              } else {
                                serviceRequest.status = 'APL';
                                serviceRequest.approvedBy = user._id;
                                serviceRequest.approvedAt = new Date();
                                serviceRequest.save(err => {
                                  if (err) {
                                    res.json({
                                      success: false,
                                      message: 'Something went wrong'
                                    });
                                  } else {
                                    res.json({
                                      success: true,
                                      message:
                                        'Request approved and quantity is deducted'
                                    });
                                  }
                                });
                              }
                            });
                          }
                        } else {
                          serviceRequest.status = 'APL';
                          serviceRequest.approvedBy = user._id;
                          serviceRequest.approvedAt = new Date();
                          serviceRequest.save(err => {
                            if (err) {
                              res.json({
                                success: false,
                                message: 'Something went wrong'
                              });
                            } else {
                              res.json({
                                success: true,
                                message: 'Request approved for type other'
                              });
                            }
                          });
                        }
                      }
                    }
                  }
                }
              );
            }
          }
        });
      }
    });
  }
});

module.exports = router;
