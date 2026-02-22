import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, index = 0 }) => {
    const { addToCart } = useContext(CartContext);
    const { toggleWishlist, isInWishlist } = useWishlist();
    const wishlisted = isInWishlist(product._id);

    const discount = product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const handleQuickAdd = (e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0] || '', 1); };
    const handleWishlist = (e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product._id); };

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <Link to={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] bg-white/[0.03] rounded-xl overflow-hidden mb-3 border border-white/5 hover:border-[#39ff14]/20 transition-all duration-500">
                    <motion.img src={product.image} alt={product.name} className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }} transition={{ duration: 0.5, ease: 'easeOut' }} loading="lazy" />

                    <motion.button onClick={handleWishlist} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}
                        className="absolute top-3 right-3 w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-full flex items-center justify-center z-10 border border-white/10 hover:border-[#39ff14]/30 transition-colors">
                        <motion.div animate={wishlisted ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
                            <Heart className={`h-4 w-4 ${wishlisted ? 'text-[#39ff14] fill-current' : 'text-white/60'}`} />
                        </motion.div>
                    </motion.button>

                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {discount > 0 && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}
                                className="bg-[#39ff14] text-[#0a0a0a] text-[10px] font-black px-2 py-1 rounded">-{discount}%</motion.span>
                        )}
                        {product.tag === 'new-arrival' && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
                                className="bg-white/10 text-[#39ff14] text-[10px] font-bold px-2 py-1 rounded border border-[#39ff14]/30">NEW</motion.span>
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={handleQuickAdd}
                            className="w-full py-3 text-xs font-bold text-[#39ff14] uppercase tracking-wider flex items-center justify-center gap-2 hover:text-[#0a0a0a] hover:bg-[#39ff14] transition-all duration-300">
                            <ShoppingBag className="h-3.5 w-3.5" /> Quick Add
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] text-[#39ff14]/40 uppercase tracking-wider font-medium">GYMJERKSS</p>
                    <h3 className="text-sm font-semibold text-white/90 mt-0.5 line-clamp-1 group-hover:text-[#39ff14] transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-white">Rs. {product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-xs text-white/30 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                    {product.colors?.length > 0 && (
                        <div className="flex gap-1.5 mt-2">
                            {product.colors.slice(0, 4).map(color => (
                                <span key={color} className="w-3 h-3 rounded-full border border-white/10"
                                    style={{ backgroundColor: color.toLowerCase() === 'white' ? '#e0e0e0' : color.toLowerCase() === 'black' ? '#222' : color.toLowerCase() === 'navy' ? '#1a2d47' : color.toLowerCase() === 'olive' ? '#556b2f' : color.toLowerCase() === 'charcoal' ? '#36454f' : color.toLowerCase() }} />
                            ))}
                            {product.colors.length > 4 && <span className="text-[10px] text-white/30 ml-1">+{product.colors.length - 4}</span>}
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
