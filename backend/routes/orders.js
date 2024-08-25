const express = require('express');
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controller/orderController');

// Get all orders
router.get('/', getOrders);

// Create a new order
router.post('/', createOrder);

// Update order status
router.put('/:id', updateOrderStatus);

// Delete an order
router.delete('/:id', deleteOrder);

module.exports = router;
