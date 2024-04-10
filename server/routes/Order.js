const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder,fetchAllOrders } = require('../controller/Order');

const router = express.Router();
//  /orders is already added in base path
router.get('/',fetchAllOrders)
router.post('/', createOrder)
router.get('/user/:userId', fetchOrdersByUser)
router.delete('/:id', deleteOrder)
router.patch('/:id', updateOrder)
      


exports.router = router;
