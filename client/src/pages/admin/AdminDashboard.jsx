import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';
import api from '../../utils/api';

const StatCard = ({ icon: Icon, label, value, color, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass rounded-2xl p-6 hover:border-white/10 transition-colors"
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <p className="text-3xl font-heading font-black text-white">{value}</p>
        <p className="text-gray-500 text-sm mt-1">{label}</p>
    </motion.div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({ orders: 0, revenue: 0, users: 0, products: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersRes, usersRes, productsRes] = await Promise.all([
                    api.get('/orders'),
                    api.get('/users'),
                    api.get('/products'),
                ]);

                const orders = ordersRes.data;
                const revenue = orders.filter(o => o.isPaid).reduce((sum, o) => sum + o.totalPrice, 0);

                setStats({
                    orders: orders.length,
                    revenue,
                    users: usersRes.data.length,
                    products: productsRes.data.length,
                });
                setRecentOrders(orders.slice(0, 5));
            } catch { }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const statCards = [
        { icon: DollarSign, label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, color: 'bg-[#ccff00]/10 text-[#ccff00]' },
        { icon: ShoppingCart, label: 'Total Orders', value: stats.orders, color: 'bg-blue-500/10 text-blue-400' },
        { icon: Users, label: 'Total Users', value: stats.users, color: 'bg-purple-500/10 text-purple-400' },
        { icon: Package, label: 'Total Products', value: stats.products, color: 'bg-orange-500/10 text-orange-400' },
    ];

    const statusColors = {
        'Processing': 'bg-yellow-500/10 text-yellow-400',
        'Shipped': 'bg-blue-500/10 text-blue-400',
        'Delivered': 'bg-green-500/10 text-green-400',
        'Cancelled': 'bg-red-500/10 text-red-400',
    };

    return (
        <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-black uppercase text-white mb-8">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
                {statCards.map((stat, i) => (
                    <StatCard key={i} {...stat} index={i} />
                ))}
            </div>

            {/* Recent Orders */}
            <div className="glass rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="font-heading text-lg font-bold text-white">Recent Orders</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Order ID</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Customer</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Amount</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Status</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            <td key={j} className="px-6 py-4"><div className="skeleton h-4 w-20"></div></td>
                                        ))}
                                    </tr>
                                ))
                            ) : recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-gray-500">No orders yet</td>
                                </tr>
                            ) : (
                                recentOrders.map(order => (
                                    <tr key={order._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-4 text-white text-sm font-mono">#{order._id.slice(-6)}</td>
                                        <td className="px-6 py-4 text-gray-300 text-sm">{order.user?.name || 'N/A'}</td>
                                        <td className="px-6 py-4 text-[#ccff00] font-bold text-sm">₹{order.totalPrice}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-500/10 text-gray-400'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold ${order.isPaid ? 'text-green-400' : 'text-red-400'}`}>
                                                {order.isPaid ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
