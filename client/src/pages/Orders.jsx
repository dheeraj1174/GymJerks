import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import Footer from '../components/Footer';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try { const { data } = await api.get('/orders/my'); setOrders(data); }
            catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchOrders();
    }, []);

    return (
        <div className="bg-cream min-h-screen">
            <div className="gradient-bg">
                <div className="max-w-7xl mx-auto px-4 py-10 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl sm:text-4xl font-bold text-white">My Orders</motion.h1>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="w-16 h-1 bg-accent rounded-full mx-auto mt-3" />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                                <div className="h-4 bg-warm-gray rounded w-1/3 mb-3" />
                                <div className="h-3 bg-warm-gray rounded w-1/4" />
                            </div>
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
                        <div className="w-20 h-20 bg-warm-gray rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="h-8 w-8 text-gray-300" />
                        </div>
                        <p className="text-gray-400 text-lg font-semibold">No orders yet</p>
                        <Link to="/shop" className="btn-accent inline-flex items-center gap-2 mt-6 rounded-xl">Start Shopping <ChevronRight className="h-4 w-4" /></Link>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order, i) => (
                            <motion.div key={order._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-bold text-navy">Order #{order._id.slice(-6).toUpperCase()}</p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.status === 'delivered' ? 'bg-teal/10 text-teal' : order.status === 'shipped' ? 'bg-accent/10 text-accent' : 'bg-gold/10 text-gold'}`}>
                                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                    </span>
                                </div>
                                <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1 mb-4">
                                    {order.items?.map((item, j) => (
                                        <div key={j} className="w-16 h-20 bg-warm-gray rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">{order.items?.length} items</p>
                                    <p className="text-sm font-bold text-navy">Rs. {order.totalAmount?.toLocaleString()}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Orders;
