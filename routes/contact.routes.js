const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact.controller');

router.post('/send', controller.sendMessage);
router.get('/all', controller.getAllMessages);

module.exports = router;
