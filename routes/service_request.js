const express = require('express');
const router = express.Router();

const ServiceRequestSchema = require('../models/serviceRequest');
const ServiceRequestItemSchema = require('../models/serviceRequestItem');

const userAuthMw = require('../middleware/user-auth-middleware');

router.use(userAuthMw);

router.post('/newServiceRequest', (req, res) => {
    console.log(req.body);
    res.json({ success: true, data: req.body });
});

module.exports = router;
