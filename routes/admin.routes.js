const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

router.get('/stats', controller.getDashboardStats);
router.get('/orders', controller.getAllOrders);
router.put('/complete/:id', controller.markCompleted);
router.get('/messages', controller.getMessages);


module.exports = router;
