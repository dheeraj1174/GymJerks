import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, Tag, X, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import Footer from '../components/Footer';

const Checkout = () => {
    const { cartItems, coupon, clearCart, removeCoupon } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '', address: '', city: '', state: '', pincode: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => { if (cartItems.length === 0) navigate('/cart'); }, [cartItems, navigate]);

    const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = coupon ? Math.round(subtotal * (coupon.discountPercentage / 100)) : 0;
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal - discount + shipping;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handlePay = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: order } = await api.post('/payments/create-order', {
                amount: total, items: cartItems, shippingAddress: form, couponCode: coupon?.code,
            });
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, amount: order.amount, currency: 'INR', name: 'GYMJERKSS',
                description: 'Your order', order_id: order.id,
                handler: async (response) => {
                    try {
                        await api.post('/payments/verify', { ...response, orderData: { items: cartItems, shippingAddress: form, couponCode: coupon?.code } });
                        clearCart(); navigate('/order-success');
                    } catch (err) { alert('Payment verification failed.'); }
                },
                prefill: { name: form.name, email: form.email, contact: form.phone },
                theme: { color: '#39ff14' },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) { alert('Payment initiation failed.'); }
        finally { setLoading(false); }
    };

    return (
        <div className="bg-cream min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-bold text-navy mb-8">Checkout</motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handlePay} className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                        <h2 className="font-heading text-lg font-bold text-navy mb-6 flex items-center gap-2"><Truck className="h-5 w-5 text-accent" /> Shipping Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="text-sm font-semibold text-navy mb-1.5 block">Name</label><input required name="name" value={form.name} onChange={handleChange} className="input-field rounded-xl" /></div>
                            <div><label className="text-sm font-semibold text-navy mb-1.5 block">Email</label><input required type="email" name="email" value={form.email} onChange={handleChange} className="input-field rounded-xl" /></div>
                            <div><label className="text-sm font-semibold text-navy mb-1.5 block">Phone</label><input required name="phone" value={form.phone} onChange={handleChange} className="input-field rounded-xl" /></div>
                            <div><label className="text-sm font-semibold text-navy mb-1.5 block">Pincode</label><input required name="pincode" value={form.pincode} onChange={handleChange} className="input-field rounded-xl" /></div>
                            <div className="sm:col-span-2"><label className="text-sm font-semibold text-navy mb-1.5 block">Address</label><input required name="address" value={form.address} onChange={handleChange} className="input-field rounded-xl" /></div>
                            <div><label className="text-sm font-semibold text-navy mb-1.5 block">City</label><input required name="city" value={form.city} onChange={handleChange} className="input-field rounded-xl" /></div>
                            <div><label className="text-sm font-semibold text-navy mb-1.5 block">State</label><input required name="state" value={form.state} onChange={handleChange} className="input-field rounded-xl" /></div>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                            className="w-full btn-accent mt-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm">
                            <Lock className="h-4 w-4" /> {loading ? 'Processing...' : `Pay Rs. ${total.toLocaleString()}`}
                        </motion.button>
                        <div className="flex items-center justify-center gap-3 mt-4 text-xs text-gray-400">
                            <Shield className="h-3.5 w-3.5 text-teal" /> Secured by Razorpay. Your data is encrypted.
                        </div>
                    </motion.form>

                    {/* Summary */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="font-heading text-lg font-bold text-navy mb-6">Order Summary</h2>
                            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                {cartItems.map(item => (
                                    <div key={`${item._id}-${item.selectedSize}`} className="flex gap-3">
                                        <div className="w-14 h-16 bg-warm-gray rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-navy line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-gray-400">{item.selectedSize} × {item.qty}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-navy">Rs. {(item.price * item.qty).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            {coupon && (
                                <div className="flex items-center justify-between bg-teal/10 rounded-xl px-4 py-2.5 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-teal font-semibold"><Tag className="h-4 w-4" /> {coupon.code} (-{coupon.discountPercentage}%)</div>
                                    <button onClick={removeCoupon} className="text-teal/50 hover:text-red-400"><X className="h-4 w-4" /></button>
                                </div>
                            )}

                            <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
                                {discount > 0 && <div className="flex justify-between text-teal font-semibold"><span>Discount</span><span>-Rs. {discount.toLocaleString()}</span></div>}
                                <div className="flex justify-between text-gray-500"><span>Shipping</span><span className={shipping === 0 ? 'text-teal font-medium' : ''}>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</span></div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-navy">
                                    <span>Total</span><span>Rs. {total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
