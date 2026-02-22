const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');

const PLANS = {
    Basic: 49900,   // ₹499 in paise
    Pro: 99900,     // ₹999 in paise
    Elite: 199900,  // ₹1999 in paise
};

const getRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay keys not configured in environment variables');
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
const createOrder = async (req, res, next) => {
    try {
        const { plan } = req.body;

        if (!plan || !PLANS[plan]) {
            return res.status(400).json({ message: 'Invalid plan. Choose Basic, Pro, or Elite.' });
        }

        const razorpay = getRazorpayInstance();
        const amount = PLANS[plan];

        const order = await razorpay.orders.create({
            amount,
            currency: 'INR',
            receipt: `receipt_${req.user.id}_${Date.now()}`,
            notes: {
                userId: req.user.id.toString(),
                plan,
            },
        });

        // Save pending payment record
        await Payment.create({
            user: req.user.id,
            plan,
            amount: amount / 100,
            currency: 'INR',
            razorpayOrderId: order.id,
            status: 'pending',
        });

        return res.status(201).json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing payment verification fields' });
        }

        // Check for duplicate payment
        const existingPayment = await Payment.findOne({ razorpayPaymentId: razorpay_payment_id });
        if (existingPayment && existingPayment.status === 'paid') {
            return res.status(409).json({ message: 'Payment already verified' });
        }

        // Verify HMAC-SHA256 signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            // Mark payment as failed
            await Payment.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: 'failed' }
            );
            return res.status(400).json({ message: 'Payment verification failed: invalid signature' });
        }

        // Update payment record to paid
        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: 'paid',
            },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        return res.status(200).json({
            message: 'Payment verified successfully',
            payment: {
                id: payment._id,
                plan: payment.plan,
                amount: payment.amount,
                status: payment.status,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's payment history
// @route   GET /api/payments/history
// @access  Private
const getPaymentHistory = async (req, res, next) => {
    try {
        const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, verifyPayment, getPaymentHistory };
