const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');

router.post('/create', controller.createOrder);

router.get('/test', (req, res) => {
  res.json({ message: 'Orders API working fine' });
});


module.exports = router;
