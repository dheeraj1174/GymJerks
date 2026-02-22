import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Truck, Shield, RefreshCw, Star, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const reviews = [
    { name: 'Rahul S.', rating: 5, text: 'Best gym wear I ever owned. The Beast Mode tee survived 100+ intense sessions without fading. Incredible quality.', title: 'Powerlifter' },
    { name: 'Priya P.', rating: 5, text: 'The pump cover is literally perfect. Oversized but not sloppy. My gym friends keep asking where I got it!', title: 'Fitness Coach' },
    { name: 'Arjun K.', rating: 5, text: 'Ordered 4 tees and a hoodie. Everything came perfectly. GYMJERKSS is now my go-to for all gym gear.', title: 'Bodybuilder' },
    { name: 'Sneha R.', rating: 4, text: 'Love the designs! The Legacy Hoodie is so warm and cozy. Perfect for early morning gym sessions.', title: 'CrossFit Athlete' },
    { name: 'Vikram S.', rating: 5, text: 'Finally a brand that understands gym bros. Clean aggressive designs. The quality speaks for itself.', title: 'Gym Enthusiast' },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };

const AnimatedSection = ({ children, className = '', variants = fadeUp, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={variants}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
            {children}
        </motion.div>
    );
};

const StaggerGrid = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer} className={className}>
            {children}
        </motion.div>
    );
};

const Home = () => {
    const [bestsellers, setBestsellers] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewIdx, setReviewIdx] = useState(0);
    const heroRef = useRef(null);
    const bannerRef = useRef(null);

    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

    const { scrollYProgress: bannerScroll } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
    const bannerY = useTransform(bannerScroll, [0, 1], ['0%', '20%']);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [bestRes, newRes] = await Promise.all([
                    api.get('/products?tag=bestseller'),
                    api.get('/products?tag=new-arrival'),
                ]);
                setBestsellers(bestRes.data.slice(0, 8));
                setNewArrivals(newRes.data.slice(0, 8));
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setReviewIdx(p => (p + 1) % reviews.length), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-[#0a0a0a] overflow-hidden">
            {/* ===== HERO with Parallax ===== */}
            <section ref={heroRef} className="relative h-[80vh] md:h-[90vh] overflow-hidden">
                <motion.img
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ y: heroY }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]" />
                <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4" style={{ opacity: heroOpacity }}>
                    <motion.p
                        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 px-6 py-2 border border-[#39ff14]/40 rounded-full bg-[#39ff14]/5 text-[#39ff14]"
                    >
                        ⚡ New Season Collection
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40, letterSpacing: '0.2em' }}
                        animate={{ opacity: 1, y: 0, letterSpacing: '0em' }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="font-heading text-5xl sm:text-7xl lg:text-[100px] font-bold italic leading-none animate-neon"
                    >
                        GYMJERKSS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-white/40 text-sm sm:text-base mt-4 max-w-md"
                    >
                        Premium gym wear built for those who refuse to settle. The grind, the hustle, and the gains.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="mt-8 flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/shop" className="group relative inline-flex items-center gap-3 bg-[#39ff14] text-[#0a0a0a] text-sm font-black tracking-widest uppercase px-10 py-4 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(57,255,20,0.4)]">
                            <span className="absolute inset-0 bg-[#6aff4f] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            <span className="relative">EXPLORE MORE</span>
                            <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/shop?tag=new-arrival" className="group inline-flex items-center gap-3 border-2 border-white/20 text-white text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-lg hover:border-[#39ff14]/50 hover:text-[#39ff14] transition-all duration-300">
                            New Arrivals
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                        <motion.div className="w-1 h-2 bg-[#39ff14] rounded-full shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== Trust Bar ===== */}
            <section className="bg-[#0a0a0a] border-y border-white/5">
                <StaggerGrid className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Truck, label: 'Free Shipping', sub: 'On orders above ₹999' },
                        { icon: Shield, label: 'Secure Payment', sub: '100% protected' },
                        { icon: RefreshCw, label: 'Easy Returns', sub: '7 day policy' },
                        { icon: Zap, label: 'Premium Quality', sub: '50K+ customers' },
                    ].map((item, i) => (
                        <motion.div key={i} variants={fadeUp} transition={{ duration: 0.5 }} className="flex items-center gap-3 group cursor-default">
                            <motion.div whileHover={{ rotate: 10, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }}>
                                <item.icon className="h-5 w-5 text-[#39ff14] flex-shrink-0" />
                            </motion.div>
                            <div>
                                <p className="text-sm font-semibold text-white">{item.label}</p>
                                <p className="text-xs text-white/25">{item.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </StaggerGrid>
            </section>

            {/* ===== Category Banners ===== */}
            <section className="gradient-mesh py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white text-center mb-2">Shop by Category</h2>
                        <p className="text-center text-white/25 text-sm mb-10">Find the perfect gear for your workout</p>
                    </AnimatedSection>
                    <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', label: 'T-Shirts', to: '/shop?category=T-Shirts' },
                            { img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', label: 'Hoodies', to: '/shop?category=Hoodies' },
                            { img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', label: 'Bottoms', to: '/shop?category=Bottoms' },
                        ].map((cat, i) => (
                            <motion.div key={i} variants={scaleIn} transition={{ duration: 0.6 }}>
                                <Link to={cat.to} className="group relative aspect-[4/5] rounded-2xl overflow-hidden block border border-white/5 hover:border-[#39ff14]/20 transition-all duration-500">
                                    <motion.img src={cat.img} alt={cat.label} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="w-10 h-1 rounded-full mb-3 bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                                        <h3 className="font-heading text-2xl font-bold text-white italic">{cat.label}</h3>
                                        <span className="text-white/40 text-sm flex items-center gap-1 mt-1 group-hover:text-[#39ff14] transition-colors">
                                            Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </StaggerGrid>
                </div>
            </section>

            {/* ===== Bestsellers ===== */}
            <section className="bg-[#0a0a0a] py-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <AnimatedSection>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">Bestsellers</h2>
                                <div className="w-12 h-1 bg-[#39ff14] rounded-full mt-2 shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                            </div>
                            <Link to="/shop?tag=bestseller" className="group text-sm font-semibold text-[#39ff14] flex items-center gap-1 hover:text-[#6aff4f]">
                                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </AnimatedSection>
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/4] bg-white/5 rounded-xl mb-3" />
                                    <div className="h-3 bg-white/5 rounded w-1/3 mb-2" />
                                    <div className="h-4 bg-white/5 rounded w-2/3 mb-2" />
                                    <div className="h-4 bg-white/5 rounded w-1/4" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                            {bestsellers.map((product, i) => (
                                <motion.div key={product._id} variants={fadeUp} transition={{ duration: 0.5 }}>
                                    <ProductCard product={product} index={i} />
                                </motion.div>
                            ))}
                        </StaggerGrid>
                    )}
                </div>
            </section>

            {/* ===== Parallax Mid-Banner ===== */}
            <section ref={bannerRef} className="relative h-[55vh] flex items-center justify-center overflow-hidden">
                <motion.img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80" alt="Gym" className="absolute inset-0 w-full h-full object-cover" style={{ y: bannerY }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 w-full">
                    <AnimatedSection>
                        <div className="max-w-lg">
                            <div className="w-12 h-1 bg-[#39ff14] rounded-full mb-4 shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                            <h2 className="font-heading text-4xl sm:text-6xl font-bold italic text-white">THE EVERYDAY ESSENTIAL</h2>
                            <p className="text-white/30 mt-4">Gear designed to move with you.<br />From warm-ups to PRs.</p>
                            <Link to="/shop" className="group inline-flex items-center gap-2 mt-8 bg-[#39ff14] text-[#0a0a0a] text-sm font-black tracking-widest uppercase px-8 py-3.5 rounded-lg hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all duration-300">
                                Explore Collection <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ===== New Arrivals ===== */}
            <section className="gradient-mesh py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <AnimatedSection>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">New Arrivals 🔥</h2>
                                <div className="w-12 h-1 bg-[#39ff14] rounded-full mt-2 shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                            </div>
                            <Link to="/shop?tag=new-arrival" className="group text-sm font-semibold text-[#39ff14] flex items-center gap-1 hover:text-[#6aff4f]">
                                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </AnimatedSection>
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/4] bg-white/5 rounded-xl mb-3" />
                                    <div className="h-3 bg-white/5 rounded w-1/3 mb-2" />
                                    <div className="h-4 bg-white/5 rounded w-2/3 mb-2" />
                                    <div className="h-4 bg-white/5 rounded w-1/4" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                            {newArrivals.map((product, i) => (
                                <motion.div key={product._id} variants={fadeUp} transition={{ duration: 0.5 }}>
                                    <ProductCard product={product} index={i} />
                                </motion.div>
                            ))}
                        </StaggerGrid>
                    )}
                </div>
            </section>

            {/* ===== Reviews ===== */}
            <AnimatedSection>
                <section className="bg-[#050505] py-16 relative overflow-hidden border-t border-white/5">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-[#39ff14]/3 rounded-full blur-[120px]" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#39ff14]/2 rounded-full blur-[100px]" />

                    <div className="max-w-7xl mx-auto px-4 relative">
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white text-center mb-2">What Our Customers Say</h2>
                        <p className="text-white/20 text-center text-sm mb-10">Real reviews from real lifters</p>
                        <div className="relative max-w-2xl mx-auto">
                            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.06] text-center min-h-[220px] flex flex-col items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div key={reviewIdx}
                                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                                        transition={{ duration: 0.4 }}>
                                        <div className="flex justify-center gap-1 mb-4">
                                            {[...Array(reviews[reviewIdx].rating)].map((_, i) => (
                                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}>
                                                    <Star className="h-5 w-5 text-[#39ff14] fill-current" />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <p className="text-white/50 leading-relaxed mb-6 italic">&ldquo;{reviews[reviewIdx].text}&rdquo;</p>
                                        <p className="font-bold text-white">{reviews[reviewIdx].name}</p>
                                        <p className="text-xs text-[#39ff14]/60">{reviews[reviewIdx].title}</p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="flex justify-center gap-3 mt-6">
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    onClick={() => setReviewIdx((reviewIdx - 1 + reviews.length) % reviews.length)}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[#39ff14] hover:border-[#39ff14]/30 transition-colors">
                                    <ChevronLeft className="h-5 w-5" />
                                </motion.button>
                                <div className="flex items-center gap-2">
                                    {reviews.map((_, i) => (
                                        <motion.button key={i} onClick={() => setReviewIdx(i)}
                                            className={`rounded-full transition-all ${i === reviewIdx ? 'w-6 h-2 bg-[#39ff14] shadow-[0_0_8px_rgba(57,255,20,0.5)]' : 'w-2 h-2 bg-white/15'}`}
                                            layout />
                                    ))}
                                </div>
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    onClick={() => setReviewIdx((reviewIdx + 1) % reviews.length)}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[#39ff14] hover:border-[#39ff14]/30 transition-colors">
                                    <ChevronRight className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <Footer />
        </div>
    );
};

export default Home;
