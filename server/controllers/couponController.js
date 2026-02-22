const Coupon = require('../models/Coupon');

// @desc    Create coupon
// @route   POST /api/coupons
// @access  Admin
const createCoupon = async (req, res, next) => {
    try {
        const { code, discountPercent, maxDiscount, minOrderAmount, expiresAt, usageLimit } = req.body;

        const exists = await Coupon.findOne({ code: code.toUpperCase() });
        if (exists) {
            res.status(400);
            throw new Error('Coupon code already exists');
        }

        const coupon = await Coupon.create({
            code: code.toUpperCase(),
            discountPercent,
            maxDiscount: maxDiscount || 0,
            minOrderAmount: minOrderAmount || 0,
            expiresAt,
            usageLimit: usageLimit || 0,
        });

        res.status(201).json(coupon);
    } catch (error) {
        next(error);
    }
};

// @desc    Validate coupon
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = async (req, res, next) => {
    try {
        const { code, orderAmount } = req.body;

        const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

        if (!coupon) {
            return res.status(404).json({ message: 'Invalid coupon code' });
        }

        if (new Date(coupon.expiresAt) < new Date()) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }

        if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
            return res.status(400).json({ message: 'Coupon usage limit reached' });
        }

        if (orderAmount < coupon.minOrderAmount) {
            return res.status(400).json({ message: `Minimum order amount is ₹${coupon.minOrderAmount}` });
        }

        let discount = (orderAmount * coupon.discountPercent) / 100;
        if (coupon.maxDiscount > 0 && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
        }

        // Increment usage
        coupon.usedCount += 1;
        await coupon.save();

        res.json({
            code: coupon.code,
            discountPercent: coupon.discountPercent,
            discount: Math.round(discount),
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Admin
const getAllCoupons = async (req, res, next) => {
    try {
        const coupons = await Coupon.find({}).sort({ createdAt: -1 });
        res.json(coupons);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
// @access  Admin
const deleteCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            res.status(404);
            throw new Error('Coupon not found');
        }
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({ message: 'Coupon removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = { createCoupon, validateCoupon, getAllCoupons, deleteCoupon };
