import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, X, Tag } from 'lucide-react';
import api from '../../utils/api';

const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        code: '', discountPercent: '', maxDiscount: '', minOrderAmount: '', expiresAt: '', usageLimit: '',
    });

    const fetchCoupons = async () => {
        try {
            const { data } = await api.get('/coupons');
            setCoupons(data);
        } catch { }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchCoupons(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/coupons', {
                ...form,
                discountPercent: Number(form.discountPercent),
                maxDiscount: Number(form.maxDiscount) || 0,
                minOrderAmount: Number(form.minOrderAmount) || 0,
                usageLimit: Number(form.usageLimit) || 0,
            });
            setShowForm(false);
            setForm({ code: '', discountPercent: '', maxDiscount: '', minOrderAmount: '', expiresAt: '', usageLimit: '' });
            fetchCoupons();
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating coupon');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this coupon?')) return;
        try {
            await api.delete(`/coupons/${id}`);
            fetchCoupons();
        } catch { }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-heading text-2xl lg:text-3xl font-black uppercase text-white">Coupons</h1>
                <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Coupon
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-[#111] border border-white/10 rounded-2xl p-6 lg:p-8 w-full max-w-lg"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-heading text-xl font-bold text-white">New Coupon</h3>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">Code</label>
                                <input required value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} className="input-dark uppercase" placeholder="e.g. SAVE20" />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Discount %</label>
                                    <input type="number" required min="1" max="100" value={form.discountPercent} onChange={e => setForm({ ...form, discountPercent: e.target.value })} className="input-dark" />
                                </div>
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Max Discount (₹)</label>
                                    <input type="number" value={form.maxDiscount} onChange={e => setForm({ ...form, maxDiscount: e.target.value })} className="input-dark" placeholder="0 = no cap" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Min Order (₹)</label>
                                    <input type="number" value={form.minOrderAmount} onChange={e => setForm({ ...form, minOrderAmount: e.target.value })} className="input-dark" placeholder="0" />
                                </div>
                                <div>
                                    <label className="text-white text-sm font-medium mb-2 block">Usage Limit</label>
                                    <input type="number" value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: e.target.value })} className="input-dark" placeholder="0 = unlimited" />
                                </div>
                            </div>
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">Expires At</label>
                                <input type="date" required value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} className="input-dark" />
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 text-lg">Create Coupon</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Coupons Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="skeleton h-40 rounded-2xl"></div>
                    ))}
                </div>
            ) : coupons.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No coupons yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coupons.map(coupon => (
                        <motion.div
                            key={coupon._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass rounded-2xl p-6 hover:border-[#ccff00]/20 transition-colors relative group"
                        >
                            <button
                                onClick={() => handleDelete(coupon._id)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 flex items-center justify-center">
                                    <Tag className="h-5 w-5 text-[#ccff00]" />
                                </div>
                                <span className="text-[#ccff00] font-heading font-bold text-xl">{coupon.code}</span>
                            </div>

                            <p className="text-white text-3xl font-heading font-black mb-3">{coupon.discountPercent}% OFF</p>

                            <div className="space-y-1 text-xs text-gray-500">
                                {coupon.maxDiscount > 0 && <p>Max discount: ₹{coupon.maxDiscount}</p>}
                                {coupon.minOrderAmount > 0 && <p>Min order: ₹{coupon.minOrderAmount}</p>}
                                <p>Expires: {new Date(coupon.expiresAt).toLocaleDateString()}</p>
                                <p>Used: {coupon.usedCount}{coupon.usageLimit > 0 ? ` / ${coupon.usageLimit}` : ' (unlimited)'}</p>
                            </div>

                            <div className="mt-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${coupon.isActive && new Date(coupon.expiresAt) > new Date() ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {coupon.isActive && new Date(coupon.expiresAt) > new Date() ? 'Active' : 'Expired'}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCoupons;
