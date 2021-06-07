const express = require('express');
const adminController = require('../controllers/Admin');

const router = express.Router();

router.get('/mkbhd', adminController.getTwitter);

module.exports = router;
