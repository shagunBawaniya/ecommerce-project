const express = require('express');
const router = express.Router();
const verifyToken = require('../auth/authentication');
const { createOrder, getAllOrders, getOrderById, updateOrder } = require('../controllers/OrderController'); 

router.post('/',   verifyToken, createOrder);
router.get('/',    verifyToken, getAllOrders);
router.get('/:id', verifyToken, getOrderById);
router.put('/:id', verifyToken, updateOrder);

module.exports = router;