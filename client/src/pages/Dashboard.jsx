import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, User, ShoppingBag, ArrowRight, Settings, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import Footer from '../components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try { const { data } = await api.get('/orders/my'); setOrders(data); } catch (err) { console.error(err); }
        };
        fetchOrders();
    }, []);

    const quickLinks = [
        { icon: Package, label: 'My Orders', to: '/orders', desc: `${orders.length} orders`, color: 'text-accent', bg: 'bg-accent/10' },
        { icon: Heart, label: 'Wishlist', to: '/wishlist', desc: 'Saved items', color: 'text-teal', bg: 'bg-teal/10' },
        { icon: ShoppingBag, label: 'Shop', to: '/shop', desc: 'Browse all', color: 'text-gold', bg: 'bg-gold/10' },
        { icon: Settings, label: 'Settings', to: '#', desc: 'Account settings', color: 'text-navy', bg: 'bg-navy/10' },
    ];

    return (
        <div className="bg-cream min-h-screen">
            {/* Header */}
            <div className="gradient-bg">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center">
                            <span className="text-2xl font-bold text-accent">{user?.name?.[0]?.toUpperCase()}</span>
                        </div>
                        <div>
                            <h1 className="font-heading text-2xl font-bold text-white">Hey, {user?.name}! 👋</h1>
                            <p className="text-white/40 text-sm">{user?.email}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Quick Links */}
                <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {quickLinks.map((link, i) => (
                        <motion.div key={i} variants={fadeUp}>
                            <Link to={link.to} className="group block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all">
                                <div className={`w-11 h-11 ${link.bg} rounded-xl flex items-center justify-center mb-3`}>
                                    <link.icon className={`h-5 w-5 ${link.color}`} />
                                </div>
                                <h3 className="font-semibold text-navy text-sm">{link.label}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{link.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Recent Orders */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-heading text-xl font-bold text-navy">Recent Orders</h2>
                        <Link to="/orders" className="text-sm text-accent font-semibold flex items-center gap-1 hover:text-accent-light">
                            View All <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                            <Package className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-400">No orders yet</p>
                            <Link to="/shop" className="text-accent font-semibold text-sm mt-2 inline-block">Start shopping →</Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {orders.slice(0, 3).map(order => (
                                <div key={order._id} className="bg-white rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-warm-gray rounded-xl overflow-hidden flex-shrink-0">
                                            {order.items?.[0]?.image && <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-navy">Order #{order._id.slice(-6).toUpperCase()}</p>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${order.status === 'delivered' ? 'bg-teal/10 text-teal' : order.status === 'shipped' ? 'bg-accent/10 text-accent' : 'bg-gold/10 text-gold'}`}>
                                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                        </span>
                                        <p className="text-sm font-bold text-navy mt-1">Rs. {order.totalAmount?.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
