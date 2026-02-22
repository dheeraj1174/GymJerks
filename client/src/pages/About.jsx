import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Heart, Award, Users } from 'lucide-react';
import Footer from '../components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const AnimatedSection = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}
            transition={{ duration: 0.6 }} className={className}>{children}</motion.div>
    );
};

const values = [
    { icon: Zap, title: 'Performance First', desc: 'Every fabric is tested for breathability, stretch, and durability during the most intense workouts.' },
    { icon: Heart, title: 'Built with Passion', desc: "We're lifters first, designers second. Every product comes from real gym experience." },
    { icon: Award, title: 'Premium Quality', desc: 'No shortcuts in materials. Our gear is made to last through hundreds of wash cycles.' },
    { icon: Users, title: 'Community Driven', desc: 'Designed by the community, for the community. Your feedback shapes every new collection.' },
];

const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '200+', label: 'Products' },
    { value: '4.8', label: 'Avg Rating' },
    { value: '15+', label: 'Cities' },
];

const About = () => (
    <div className="bg-[#0a0a0a] min-h-screen">
        {/* Hero */}
        <section className="relative h-[50vh] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80" alt="Gym" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="w-12 h-1 bg-[#39ff14] rounded-full mb-4 shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                        <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white italic">OUR STORY</h1>
                        <p className="text-white/30 mt-4 max-w-md">Built from the gym floor up. GYMJERKSS is where passion meets performance.</p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Story */}
        <section className="gradient-mesh py-16">
            <div className="max-w-4xl mx-auto px-4">
                <AnimatedSection>
                    <div className="card-dark rounded-2xl p-8 sm:p-12">
                        <h2 className="font-heading text-2xl font-bold text-white mb-4">Who We Are</h2>
                        <div className="w-10 h-1 bg-[#39ff14] rounded-full mb-6 shadow-[0_0_8px_rgba(57,255,20,0.4)]" />
                        <p className="text-white/30 leading-relaxed mb-4">
                            GYMJERKSS was born from a simple frustration: why does gym wear have to be boring? We are a team of lifters, runners, and CrossFit addicts who got tired of generic, overpriced fitness apparel.
                        </p>
                        <p className="text-white/30 leading-relaxed">
                            Every piece we design goes through real gym testing. From the fabric selection to the final stitch, we obsess over details so you can focus on your workout. Our mission is simple: make gym wear that looks as good as it performs.
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>

        {/* Values */}
        <section className="bg-[#0a0a0a] py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <AnimatedSection>
                    <h2 className="font-heading text-3xl font-bold text-white text-center mb-2">Our Values</h2>
                    <p className="text-center text-white/20 text-sm mb-10">What drives us every day</p>
                </AnimatedSection>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {values.map((v, i) => (
                        <motion.div key={i} variants={fadeUp} whileHover={{ y: -5 }}
                            className="card-dark rounded-2xl p-6 text-center hover:border-[#39ff14]/20 transition-all">
                            <div className="w-14 h-14 bg-[#39ff14]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <v.icon className="h-6 w-6 text-[#39ff14]" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-white">{v.title}</h3>
                            <p className="text-sm text-white/25 mt-2 leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>

        {/* Stats */}
        <section className="gradient-bg py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <motion.div key={i} variants={fadeUp} className="text-center">
                            <p className="font-heading text-4xl font-bold text-[#39ff14]">{s.value}</p>
                            <p className="text-white/25 text-sm mt-1">{s.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>

        <Footer />
    </div>
);

export default About;
