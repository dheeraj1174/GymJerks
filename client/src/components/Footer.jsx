import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => (
    <footer className="bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#39ff14]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#39ff14]/2 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 py-16 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="md:col-span-1">
                    <Link to="/" className="font-heading text-2xl font-bold tracking-wider">
                        <span className="text-[#39ff14]">GYM</span>JERKSS
                    </Link>
                    <p className="text-white/25 text-sm mt-4 leading-relaxed">Premium gym wear built for the grind. Designed by lifters, for lifters.</p>
                    <div className="flex gap-3 mt-6">
                        {[Instagram, Twitter, Youtube].map((Icon, i) => (
                            <motion.a key={i} href="#" whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-[#39ff14] hover:border-[#39ff14]/30 hover:shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all">
                                <Icon className="h-4 w-4" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#39ff14] mb-5">Shop</h4>
                    <div className="space-y-3">
                        {['T-Shirts', 'Hoodies', 'Bottoms', 'Accessories', 'New Arrivals'].map(item => (
                            <Link key={item} to={`/shop?category=${item}`} className="block text-sm text-white/30 hover:text-[#39ff14] transition-colors">{item}</Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#39ff14] mb-5">Company</h4>
                    <div className="space-y-3">
                        {[{ label: 'About Us', to: '/about' }, { label: 'Contact', to: '/contact' }, { label: 'Track Order', to: '/orders' }].map(item => (
                            <Link key={item.label} to={item.to} className="block text-sm text-white/30 hover:text-[#39ff14] transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#39ff14] mb-5">Stay Connected</h4>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-white/30"><Mail className="h-4 w-4 text-[#39ff14]" /> support@gymjerkss.com</div>
                        <div className="flex items-center gap-3 text-sm text-white/30"><Phone className="h-4 w-4 text-[#39ff14]/70" /> +91 98765 43210</div>
                        <div className="flex items-center gap-3 text-sm text-white/30"><MapPin className="h-4 w-4 text-[#39ff14]/50" /> Mumbai, India</div>
                    </div>
                    <div className="flex gap-2">
                        <input placeholder="Enter email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_10px_rgba(57,255,20,0.1)]" />
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="bg-[#39ff14] text-[#0a0a0a] px-4 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all font-bold">
                            <ArrowRight className="h-4 w-4" />
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/20">&copy; 2025 GYMJERKSS. All rights reserved.</p>
                <div className="flex gap-6">
                    {['Privacy Policy', 'Terms of Service', 'Shipping'].map(item => (
                        <a key={item} href="#" className="text-xs text-white/20 hover:text-[#39ff14] transition-colors">{item}</a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
