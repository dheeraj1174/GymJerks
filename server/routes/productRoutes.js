const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductBySlug,
    getTopProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, adminOnly, createProduct);
router.get('/top', getTopProducts);
router.get('/id/:id', protect, adminOnly, getProductById);
router.route('/:slug').get(getProductBySlug);
router.route('/:id').put(protect, adminOnly, updateProduct).delete(protect, adminOnly, deleteProduct);

module.exports = router;
