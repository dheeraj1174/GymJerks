import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, Shield, RefreshCw, Minus, Plus, Star, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import CartContext from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/Footer';

const ProductDetail = () => {
    const { slug } = useParams();
    const { addToCart } = useContext(CartContext);
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [imgIdx, setImgIdx] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try { const { data } = await api.get(`/products/${slug}`); setProduct(data); setSelectedSize(data.sizes?.[0] || ''); setSelectedColor(data.colors?.[0] || ''); }
            catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => { addToCart(product, selectedSize, selectedColor, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); };

    if (loading) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-2 border-[#39ff14]/30 border-t-[#39ff14] rounded-full" />
        </div>
    );
    if (!product) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="text-center"><p className="text-white/50 text-lg">Product not found</p><Link to="/shop" className="text-[#39ff14] font-semibold text-sm mt-2 inline-block">← Back to Shop</Link></div>
        </div>
    );

    const discount = product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    const images = product.images?.length > 0 ? product.images : [product.image];
    const wishlisted = isInWishlist(product._id);

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-white/20 mb-6">
                    <Link to="/" className="hover:text-[#39ff14]">Home</Link> / <Link to="/shop" className="hover:text-[#39ff14]">Shop</Link> / <span className="text-white/50">{product.name}</span>
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Images */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="relative aspect-[3/4] bg-white/[0.03] rounded-2xl overflow-hidden border border-white/5 mb-3">
                            <AnimatePresence mode="wait">
                                <motion.img key={imgIdx} src={images[imgIdx]} alt={product.name}
                                    initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }} className="w-full h-full object-cover" />
                            </AnimatePresence>
                            {discount > 0 && (
                                <span className="absolute top-4 left-4 bg-[#39ff14] text-[#0a0a0a] text-xs font-black px-3 py-1.5 rounded">-{discount}% OFF</span>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-2">
                                {images.map((img, i) => (
                                    <button key={i} onClick={() => setImgIdx(i)}
                                        className={`w-16 h-20 rounded-lg border-2 overflow-hidden transition-all ${i === imgIdx ? 'border-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.3)]' : 'border-white/10 opacity-50 hover:opacity-100'}`}>
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Details */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <p className="text-[10px] text-[#39ff14]/40 uppercase tracking-widest font-medium mb-1">GYMJERKSS</p>
                        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">{product.name}</h1>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < (product.rating || 4) ? 'text-[#39ff14] fill-current' : 'text-white/10'}`} />)}
                            </div>
                            <span className="text-xs text-white/25">({product.numReviews || 0} reviews)</span>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mt-4">
                            <span className="text-3xl font-bold text-white">Rs. {product.price.toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                                <span className="text-lg text-white/25 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                            )}
                            {discount > 0 && <span className="text-sm font-bold text-[#39ff14] bg-[#39ff14]/10 px-2 py-0.5 rounded">Save {discount}%</span>}
                        </motion.div>

                        <p className="text-white/35 text-sm mt-4 leading-relaxed">{product.description}</p>

                        {/* Sizes */}
                        {product.sizes?.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
                                <p className="text-sm font-semibold text-white mb-3">Size</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(size => (
                                        <motion.button key={size} onClick={() => setSelectedSize(size)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            className={`min-w-[48px] h-12 px-3 rounded-xl text-sm font-bold transition-all ${selectedSize === size
                                                ? 'bg-[#39ff14] text-[#0a0a0a] shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                                                : 'bg-white/5 text-white/50 border border-white/10 hover:border-[#39ff14]/30'}`}>
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Colors */}
                        {product.colors?.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-6">
                                <p className="text-sm font-semibold text-white mb-3">Color: <span className="text-white/40 font-normal">{selectedColor}</span></p>
                                <div className="flex gap-3">
                                    {product.colors.map(color => (
                                        <motion.button key={color} onClick={() => setSelectedColor(color)} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                            className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === color ? 'border-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.4)] scale-110' : 'border-white/15 hover:border-white/30'}`}
                                            style={{ backgroundColor: color.toLowerCase() === 'white' ? '#e0e0e0' : color.toLowerCase() === 'black' ? '#222' : color.toLowerCase() === 'navy' ? '#1a2d47' : color.toLowerCase() }} />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Qty */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
                            <p className="text-sm font-semibold text-white mb-3">Quantity</p>
                            <div className="flex items-center bg-white/5 rounded-xl border border-white/10 w-fit">
                                <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-[#39ff14]"><Minus className="h-4 w-4" /></motion.button>
                                <motion.span key={qty} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-12 text-center font-bold text-white">{qty}</motion.span>
                                <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-[#39ff14]"><Plus className="h-4 w-4" /></motion.button>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex gap-3 mt-8">
                            <motion.button onClick={handleAddToCart} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className="flex-1 bg-[#39ff14] text-[#0a0a0a] rounded-xl py-4 font-bold flex items-center justify-center gap-2 text-sm tracking-wider hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all">
                                <AnimatePresence mode="wait">
                                    {added ? (
                                        <motion.span key="added" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}
                                            className="flex items-center gap-2"><Check className="h-5 w-5" /> Added!</motion.span>
                                    ) : (
                                        <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"><ShoppingBag className="h-5 w-5" /> ADD TO CART</motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                            <motion.button onClick={() => toggleWishlist(product._id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}
                                className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all ${wishlisted
                                    ? 'bg-[#39ff14]/10 border-[#39ff14]/40 text-[#39ff14]'
                                    : 'bg-white/5 border-white/10 text-white/40 hover:border-[#39ff14]/30 hover:text-[#39ff14]'}`}>
                                <Heart className={`h-5 w-5 ${wishlisted ? 'fill-current' : ''}`} />
                            </motion.button>
                        </motion.div>

                        {/* Trust */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-3 mt-8">
                            {[
                                { icon: Truck, label: 'Free Shipping', sub: 'On ₹999+' },
                                { icon: Shield, label: 'Secure', sub: '100% safe' },
                                { icon: RefreshCw, label: 'Easy Returns', sub: '7 days' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/[0.03] rounded-xl p-3 text-center border border-white/5">
                                    <item.icon className="h-5 w-5 text-[#39ff14] mx-auto mb-1.5" />
                                    <p className="text-xs font-semibold text-white">{item.label}</p>
                                    <p className="text-[10px] text-white/25">{item.sub}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
