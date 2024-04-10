const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require('../controller/Product');

const router = express.Router();
//  /products is already added in base path
router.post('/', createProduct)
router.get('/', fetchAllProducts)
router.get('/:id', fetchProductById)
router.patch('/:id', updateProduct)

exports.router = router;
