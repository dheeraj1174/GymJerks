const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay keys not configured');
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
    try {
        const {
            orderItems, shippingAddress, paymentMethod,
            itemsPrice, taxPrice, shippingPrice, totalPrice,
            couponCode, discountAmount,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        }

        // Create Razorpay order
        const razorpay = getRazorpayInstance();
        const options = {
            amount: Math.round(totalPrice * 100),
            currency: 'INR',
            receipt: `receipt_${req.user._id}_${Date.now()}`,
        };
        const rzpOrder = await razorpay.orders.create(options);

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            razorpayOrderId: rzpOrder.id,
            couponCode: couponCode || '',
            discountAmount: discountAmount || 0,
        });

        const createdOrder = await order.save();
        res.status(201).json({
            ...createdOrder._doc,
            razorpayOrderId: rzpOrder.id,
            keyId: process.env.RAZORPAY_KEY_ID,
            amount: options.amount,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify Razorpay payment & decrement inventory
// @route   POST /api/orders/verify
// @access  Private
const verifyOrderPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: razorpay_payment_id,
                    status: 'paid',
                    update_time: Date.now(),
                };

                // Decrement inventory
                for (const item of order.orderItems) {
                    await Product.findByIdAndUpdate(item.product, {
                        $inc: { countInStock: -item.qty }
                    });
                }

                const updatedOrder = await order.save();
                res.json(updatedOrder);
            } else {
                res.status(404);
                throw new Error('Order not found');
            }
        } else {
            res.status(400);
            throw new Error('Payment verification failed');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Admin
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }

        order.status = req.body.status || order.status;

        if (req.body.status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        if (req.body.status === 'Cancelled') {
            // Restore inventory on cancellation
            for (const item of order.orderItems) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { countInStock: item.qty }
                });
            }
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    verifyOrderPayment,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
};
