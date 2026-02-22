import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="min-h-screen gradient-mesh flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                className="text-center max-w-md w-full bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-teal" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="font-heading text-3xl font-bold text-navy">Order Placed! 🎉</motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="text-gray-400 mt-3">Thank you for shopping with GYMJERKSS.<br />Your order will be shipped shortly.</motion.p>
                {orderId && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="bg-warm-gray text-sm text-navy font-mono rounded-xl px-4 py-2.5 mt-4 inline-block">
                        Order ID: #{orderId.slice(-8).toUpperCase()}
                    </motion.p>
                )}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Link to="/orders" className="btn-outline flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm">
                        <Package className="h-4 w-4" /> Track Order
                    </Link>
                    <Link to="/shop" className="btn-accent flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm">
                        Continue Shopping <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
