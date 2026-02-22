const express = require('express');
const router = express.Router();
const {
    createOrder,
    verifyOrderPayment,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/').post(protect, createOrder).get(protect, adminOnly, getAllOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/verify').post(protect, verifyOrderPayment);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, adminOnly, updateOrderStatus);

module.exports = router;
