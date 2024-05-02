const express = require('express');
const router = express.Router();
const verifyToken = require('../auth/authentication');
const { createProduct, fetchAllProduct, productFindById, updateProduct, deleteProduct } = require('../controllers/ProductController');

router.post('/', verifyToken, createProduct);
router.get('/',  verifyToken, fetchAllProduct);
router.get('/:id',  verifyToken, productFindById);
router.put('/:id',  verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;