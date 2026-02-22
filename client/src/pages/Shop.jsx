import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const categories = ['All', 'T-Shirts', 'Hoodies', 'Bottoms', 'Accessories'];
const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
];

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [sort, setSort] = useState('newest');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const tag = searchParams.get('tag');
                const url = tag ? `/products?tag=${tag}` : '/products';
                const { data } = await api.get(url);
                setProducts(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchProducts();
    }, [searchParams]);

    useEffect(() => {
        setCategory(searchParams.get('category') || 'All');
        setSearch(searchParams.get('search') || '');
    }, [searchParams]);

    let filtered = [...products];
    if (category !== 'All') filtered = filtered.filter(p => p.category === category);
    if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
    }
    switch (sort) {
        case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
        case 'rating': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
        default: break;
    }

    const handleCategoryClick = (cat) => {
        setCategory(cat);
        const params = new URLSearchParams(searchParams);
        if (cat === 'All') params.delete('category'); else params.set('category', cat);
        params.delete('tag');
        setSearchParams(params);
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* Header */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gradient-bg border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 right-20 w-64 h-64 bg-[#39ff14]/10 rounded-full blur-[120px]" />
                </div>
                <div className="max-w-7xl mx-auto px-4 py-14 text-center relative">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl font-bold text-white">
                        {searchParams.get('tag') === 'bestseller' ? 'Bestsellers' :
                            searchParams.get('tag') === 'new-arrival' ? 'New Arrivals 🔥' :
                                category !== 'All' ? category : 'All Products'}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/25 mt-3 text-sm">{filtered.length} products found</motion.p>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="w-16 h-1 bg-[#39ff14] rounded-full mx-auto mt-4 shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Toolbar */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <motion.button key={cat} onClick={() => handleCategoryClick(cat)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${category === cat
                                    ? 'bg-[#39ff14] text-[#0a0a0a] font-bold shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                                    : 'bg-white/5 text-white/50 hover:text-white border border-white/10 hover:border-[#39ff14]/30'}`}>
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                                className="pl-10 pr-4 py-2.5 text-sm border border-white/10 rounded-xl w-full sm:w-48 focus:border-[#39ff14] focus:outline-none focus:ring-2 focus:ring-[#39ff14]/10 bg-white/5 text-white placeholder-white/20" />
                        </div>
                        <select value={sort} onChange={e => setSort(e.target.value)}
                            className="px-3 py-2.5 text-sm border border-white/10 rounded-xl bg-white/5 text-white/70 focus:border-[#39ff14] focus:outline-none">
                            {sortOptions.map(opt => (<option key={opt.value} value={opt.value} className="bg-[#111]">{opt.label}</option>))}
                        </select>
                    </div>
                </motion.div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {[...Array(8)].map((_, i) => (<div key={i} className="animate-pulse"><div className="aspect-[3/4] bg-white/5 rounded-xl mb-3" /><div className="h-3 bg-white/5 rounded w-1/3 mb-2" /><div className="h-4 bg-white/5 rounded w-2/3 mb-2" /><div className="h-4 bg-white/5 rounded w-1/4" /></div>))}
                    </div>
                ) : filtered.length === 0 ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="h-8 w-8 text-white/15" /></div>
                        <p className="text-white/40 text-lg font-semibold">No products found</p>
                        <p className="text-white/20 text-sm mt-1">Try adjusting your filters</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {filtered.map((product, i) => (<ProductCard key={product._id} product={product} index={i} />))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
