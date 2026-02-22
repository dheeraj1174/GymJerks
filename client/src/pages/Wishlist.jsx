import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/Footer';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();

    return (
        <div className="bg-cream min-h-screen">
            <div className="gradient-bg">
                <div className="max-w-7xl mx-auto px-4 py-10 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl sm:text-4xl font-bold text-white flex items-center justify-center gap-3">
                        <Heart className="h-8 w-8 text-accent" /> My Wishlist
                    </motion.h1>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="w-16 h-1 bg-accent rounded-full mx-auto mt-3" />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {wishlistItems.length === 0 ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
                        <div className="w-20 h-20 bg-warm-gray rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="h-8 w-8 text-gray-300" />
                        </div>
                        <p className="text-gray-400 text-lg font-semibold">Your wishlist is empty</p>
                        <p className="text-gray-300 text-sm mt-1">Save items you love for later</p>
                        <Link to="/shop" className="btn-accent inline-flex items-center gap-2 mt-6 rounded-xl">
                            Browse Products <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {wishlistItems.map((item, i) => (
                                <motion.div key={item._id || item}
                                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="w-20 h-24 bg-warm-gray rounded-xl overflow-hidden flex-shrink-0">
                                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <p className="font-semibold text-navy text-sm">{item.name || 'Product'}</p>
                                            {item.price && <p className="text-sm font-bold text-accent mt-1">Rs. {item.price.toLocaleString()}</p>}
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <Link to={`/product/${item.slug}`} className="text-xs bg-accent/10 text-accent font-semibold px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-colors flex items-center gap-1">
                                                <ShoppingBag className="h-3 w-3" /> View
                                            </Link>
                                            <motion.button whileTap={{ scale: 0.85 }} onClick={() => removeFromWishlist(item._id)}
                                                className="text-xs text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all flex items-center gap-1">
                                                <Trash2 className="h-3 w-3" /> Remove
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
