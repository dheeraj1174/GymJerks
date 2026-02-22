import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartContext from '../context/CartContext';
import api from '../utils/api';
import Footer from '../components/Footer';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, coupon, applyCoupon, removeCoupon } = useContext(CartContext);
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');

    const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = coupon ? coupon.discount : 0;
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal - discount + shipping;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setCouponError('');
        try {
            const { data } = await api.post('/coupons/validate', { code: couponCode, orderAmount: subtotal });
            applyCoupon(data);
            setCouponCode('');
        } catch (err) {
            setCouponError(err.response?.data?.message || 'Invalid coupon code');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a]">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 py-32 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                        <ShoppingBag className="h-8 w-8 text-white/15" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-white">Your cart is empty</h2>
                    <p className="text-white/25 text-sm mt-2">Time to add some gym gear!</p>
                    <Link to="/shop" className="inline-flex items-center gap-2 mt-6 bg-[#39ff14] text-[#0a0a0a] font-bold px-8 py-3.5 text-sm rounded-xl hover:shadow-[0_0_25px_rgba(57,255,20,0.3)] transition-all">
                        Start Shopping <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-bold text-white mb-8">
                    Shopping Cart <span className="text-[#39ff14] text-lg">({cartItems.reduce((s, i) => s + i.qty, 0)})</span>
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-3">
                        <AnimatePresence>
                            {cartItems.map((item, i) => (
                                <motion.div key={`${item.product}-${item.size}-${item.color}`}
                                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50, height: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white/[0.03] rounded-2xl p-4 flex gap-4 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="w-20 h-24 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <Link to={`/product/${item.slug}`} className="font-semibold text-sm text-white hover:text-[#39ff14] transition-colors">{item.name}</Link>
                                                <div className="flex gap-2 mt-1">
                                                    {item.size && <span className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded border border-white/10">{item.size}</span>}
                                                    {item.color && <span className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded border border-white/10">{item.color}</span>}
                                                </div>
                                            </div>
                                            <motion.button whileTap={{ scale: 0.85 }} onClick={() => removeFromCart(item.product, item.size, item.color)}
                                                className="text-white/20 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></motion.button>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                                                <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQty(item.product, item.size, item.color, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-[#39ff14]"><Minus className="h-3 w-3" /></motion.button>
                                                <span className="w-8 text-center text-sm font-bold text-white">{item.qty}</span>
                                                <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQty(item.product, item.size, item.color, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-[#39ff14]"><Plus className="h-3 w-3" /></motion.button>
                                            </div>
                                            <p className="font-bold text-white">Rs. {(item.price * item.qty).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5 sticky top-24">
                            <h2 className="font-heading text-lg font-bold text-white mb-6">Order Summary</h2>

                            {/* Coupon */}
                            {!coupon && (
                                <div className="mb-6">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                                            <input value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} placeholder="Coupon code"
                                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-white/10 rounded-xl bg-white/5 text-white placeholder-white/20 focus:border-[#39ff14] focus:outline-none" />
                                        </div>
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleApplyCoupon}
                                            className="bg-[#39ff14] text-[#0a0a0a] px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all">Apply</motion.button>
                                    </div>
                                    {couponError && <p className="text-red-400 text-xs mt-2">{couponError}</p>}
                                </div>
                            )}

                            {coupon && (
                                <div className="flex items-center justify-between bg-[#39ff14]/10 rounded-xl px-4 py-2.5 mb-4 border border-[#39ff14]/20">
                                    <div className="flex items-center gap-2 text-sm text-[#39ff14] font-semibold"><Tag className="h-4 w-4" /> {coupon.code} (-{coupon.discountPercent}%)</div>
                                    <button onClick={removeCoupon} className="text-[#39ff14]/40 hover:text-red-400"><X className="h-4 w-4" /></button>
                                </div>
                            )}

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-white/40"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
                                {discount > 0 && <div className="flex justify-between text-[#39ff14] font-semibold"><span>Discount</span><span>-Rs. {discount.toLocaleString()}</span></div>}
                                <div className="flex justify-between text-white/40">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? 'text-[#39ff14] font-medium' : ''}>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</span>
                                </div>
                                <div className="border-t border-white/5 pt-3 flex justify-between font-bold text-lg text-white">
                                    <span>Total</span><span>Rs. {total.toLocaleString()}</span>
                                </div>
                            </div>
                            <Link to="/checkout">
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    className="w-full bg-[#39ff14] text-[#0a0a0a] mt-6 py-4 rounded-xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all">
                                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                                </motion.button>
                            </Link>
                            {shipping > 0 && <p className="text-center text-xs text-white/20 mt-3">Add Rs. {(999 - subtotal).toLocaleString()} more for free shipping</p>}
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
