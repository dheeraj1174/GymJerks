import { useState, useEffect } from 'react';
import api from '../../utils/api';

const statusColors = {
    'Processing': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'Shipped': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Delivered': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Cancelled': 'bg-red-500/10 text-red-400 border-red-500/20',
};

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch { }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchOrders(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/orders/${id}/status`, { status });
            fetchOrders();
        } catch { }
    };

    return (
        <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-black uppercase text-white mb-8">Orders</h1>

            <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Order ID</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Customer</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Items</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Total</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Payment</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Status</th>
                                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        {Array.from({ length: 7 }).map((_, j) => (
                                            <td key={j} className="px-6 py-4"><div className="skeleton h-4 w-16"></div></td>
                                        ))}
                                    </tr>
                                ))
                            ) : orders.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-10 text-gray-500">No orders yet</td></tr>
                            ) : orders.map(order => (
                                <tr key={order._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                    <td className="px-6 py-4 text-white text-sm font-mono">#{order._id.slice(-6)}</td>
                                    <td className="px-6 py-4 text-gray-300 text-sm">{order.user?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">{order.orderItems?.length || 0} items</td>
                                    <td className="px-6 py-4 text-[#ccff00] font-bold text-sm">₹{order.totalPrice}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-bold ${order.isPaid ? 'text-green-400' : 'text-red-400'}`}>
                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border appearance-none cursor-pointer ${statusColors[order.status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}
                                        >
                                            {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                                <option key={s} value={s} className="bg-[#111] text-white">{s}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
