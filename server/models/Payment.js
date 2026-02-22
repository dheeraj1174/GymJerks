const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    plan: {
        type: String,
        required: true,
        enum: ['Basic', 'Pro', 'Elite'],
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'INR',
    },
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true,
    },
    razorpayPaymentId: {
        type: String,
        default: null,
    },
    razorpaySignature: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);
