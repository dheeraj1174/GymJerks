import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Heart, Menu, X, LogOut, Package, ChevronDown, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const categories = [
    { name: 'T-Shirts', to: '/shop?category=T-Shirts' },
    { name: 'Hoodies', to: '/shop?category=Hoodies' },
    { name: 'Bottoms', to: '/shop?category=Bottoms' },
    { name: 'Accessories', to: '/shop?category=Accessories' },
    { name: 'New Arrivals', to: '/shop?tag=new-arrival' },
];

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const { wishlistItems } = useWishlist();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [copied, setCopied] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

    useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [location]);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) { navigate(`/shop?search=${searchQuery.trim()}`); setSearchOpen(false); setSearchQuery(''); }
    };

    const copyCoupon = () => { navigator.clipboard.writeText('GET10'); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <>
            {/* Announcement Bar */}
            <div className="bg-[#39ff14] text-[#0a0a0a] text-center text-xs font-bold py-2 px-4">
                <span>⚡ Use code </span>
                <button onClick={copyCoupon} className="inline-flex items-center gap-1 font-black border border-[#0a0a0a]/30 px-2 py-0.5 rounded ml-1 mr-1 hover:bg-[#0a0a0a]/10 transition-colors">
                    GET10 {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
                <span> for 10% off your first order!</span>
            </div>

            {/* Main Navbar */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a] shadow-[0_0_30px_rgba(57,255,20,0.05)]' : 'bg-[#0a0a0a]/90 backdrop-blur-xl'} border-b border-white/5`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="font-heading text-xl font-bold tracking-wider flex items-center gap-1">
                            <span className="text-[#39ff14] animate-neon">GYM</span><span className="text-white">JERKSS</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            {categories.map(cat => (
                                <Link key={cat.name} to={cat.to}
                                    className={`text-sm font-medium transition-colors relative group ${cat.name === 'New Arrivals' ? 'text-[#39ff14]' : 'text-white/50 hover:text-white'}`}>
                                    {cat.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#39ff14] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => setSearchOpen(true)} className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-[#39ff14] transition-colors">
                                <Search className="h-5 w-5" />
                            </button>
                            <Link to="/wishlist" className="relative w-9 h-9 flex items-center justify-center text-white/40 hover:text-[#39ff14] transition-colors">
                                <Heart className="h-5 w-5" />
                                {wishlistItems.length > 0 && (
                                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#39ff14] text-[9px] font-bold text-[#0a0a0a] rounded-full flex items-center justify-center">{wishlistItems.length}</motion.span>
                                )}
                            </Link>
                            <Link to="/cart" className="relative w-9 h-9 flex items-center justify-center text-white/40 hover:text-[#39ff14] transition-colors">
                                <ShoppingBag className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#39ff14] text-[9px] font-bold text-[#0a0a0a] rounded-full flex items-center justify-center">{totalItems}</motion.span>
                                )}
                            </Link>

                            <div className="relative">
                                {user ? (
                                    <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-1 text-white/50 hover:text-white transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center">
                                            <span className="text-xs font-bold text-[#39ff14]">{user.name?.[0]?.toUpperCase()}</span>
                                        </div>
                                        <ChevronDown className="h-3 w-3 hidden sm:block" />
                                    </button>
                                ) : (
                                    <Link to="/login" className="text-sm font-medium text-white/50 hover:text-[#39ff14] transition-colors"><User className="h-5 w-5" /></Link>
                                )}
                                <AnimatePresence>
                                    {userMenuOpen && user && (
                                        <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-52 bg-[#111] rounded-xl shadow-2xl border border-white/10 py-2 overflow-hidden">
                                            <div className="px-4 py-3 border-b border-white/10">
                                                <p className="font-semibold text-sm text-white">{user.name}</p>
                                                <p className="text-xs text-white/30 truncate">{user.email}</p>
                                            </div>
                                            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/60 hover:text-[#39ff14] hover:bg-white/5 transition-colors"><User className="h-4 w-4" /> Dashboard</Link>
                                            <Link to="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/60 hover:text-[#39ff14] hover:bg-white/5 transition-colors"><Package className="h-4 w-4" /> Orders</Link>
                                            {user.isAdmin && <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#39ff14] hover:bg-white/5 transition-colors">⚡ Admin</Link>}
                                            <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors"><LogOut className="h-4 w-4" /> Logout</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 flex items-center justify-center text-white/50 hover:text-[#39ff14]">
                                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="md:hidden border-t border-white/5 bg-[#0a0a0a] overflow-hidden">
                            <div className="px-4 py-4 space-y-1">
                                {categories.map(cat => (
                                    <Link key={cat.name} to={cat.to} className="block py-2.5 text-sm font-medium text-white/60 hover:text-[#39ff14] transition-colors">{cat.name}</Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-[100] flex items-start justify-center pt-[20vh]" onClick={() => setSearchOpen(false)}>
                        <motion.div initial={{ y: -20, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -20, opacity: 0 }}
                            className="w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                                    <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products..."
                                        className="w-full bg-white/5 border border-[#39ff14]/30 rounded-xl pl-14 pr-12 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_20px_rgba(57,255,20,0.1)] text-lg" />
                                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#39ff14] font-bold text-sm">Go</button>
                                </div>
                            </form>
                            <p className="text-center text-white/15 text-xs mt-4">Press ESC to close</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
