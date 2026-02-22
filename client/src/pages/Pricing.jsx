import { Check, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const plans = [
    { name: 'Starter', price: 0, desc: 'Perfect to get started', features: ['Browse full catalog', 'Member-only deals', 'Track orders', 'Email support'], cta: 'Get Started' },
    { name: 'Pro', price: 299, desc: 'For serious lifters', popular: true, features: ['Everything in Starter', '10% off all orders', 'Early access to drops', 'Priority support', 'Free shipping always'], cta: 'Go Pro' },
    { name: 'Elite', price: 599, desc: 'Ultimate gym experience', features: ['Everything in Pro', '20% off all orders', 'Exclusive collections', 'Personal styling', 'VIP event access', '24/7 support'], cta: 'Go Elite' },
];

const Pricing = () => (
    <div className="bg-[#0a0a0a] min-h-screen">
        <div className="gradient-bg border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"><div className="absolute top-10 left-1/3 w-64 h-64 bg-[#39ff14]/10 rounded-full blur-[120px]" /></div>
            <div className="max-w-7xl mx-auto px-4 py-14 text-center relative">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl font-bold text-white">Membership Plans</motion.h1>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="w-16 h-1 bg-[#39ff14] rounded-full mx-auto mt-4 shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/25 mt-4 max-w-lg mx-auto text-sm">Unlock exclusive perks, discounts, and early access to new collections</motion.p>
            </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                        whileHover={{ y: -8 }}
                        className={`relative card-dark rounded-2xl p-7 ${plan.popular ? 'border-[#39ff14]/30 shadow-[0_0_30px_rgba(57,255,20,0.07)]' : ''} hover:border-[#39ff14]/20 transition-all`}>
                        {plan.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#39ff14] text-[#0a0a0a] text-xs font-black px-4 py-1 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(57,255,20,0.4)]">
                                <Zap className="h-3 w-3" /> Most Popular
                            </span>
                        )}
                        <h3 className="font-heading text-xl font-bold text-white mt-1">{plan.name}</h3>
                        <p className="text-xs text-white/25 mt-1">{plan.desc}</p>
                        <div className="mt-4 mb-6">
                            <span className="font-heading text-4xl font-bold text-white">₹{plan.price}</span>
                            <span className="text-white/25 text-sm">/mo</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((f, j) => (
                                <motion.li key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + j * 0.05 }}
                                    className="flex items-center gap-2.5 text-sm text-white/40">
                                    <div className="w-5 h-5 bg-[#39ff14]/10 rounded-full flex items-center justify-center flex-shrink-0"><Check className="h-3 w-3 text-[#39ff14]" /></div>
                                    {f}
                                </motion.li>
                            ))}
                        </ul>
                        <Link to="/register">
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${plan.popular ? 'btn-accent' : 'btn-outline'}`}>
                                {plan.cta}
                            </motion.button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
        <Footer />
    </div>
);

export default Pricing;
