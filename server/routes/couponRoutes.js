const express = require('express');
const router = express.Router();
const { createCoupon, validateCoupon, getAllCoupons, deleteCoupon } = require('../controllers/couponController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/').post(protect, adminOnly, createCoupon).get(protect, adminOnly, getAllCoupons);
router.post('/validate', protect, validateCoupon);
router.delete('/:id', protect, adminOnly, deleteCoupon);

module.exports = router;
