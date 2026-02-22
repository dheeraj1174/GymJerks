import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")' }}
            >
                <div className="absolute inset-0 bg-black/60 md:bg-black/50 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-3xl pt-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-neon font-bold tracking-wider mb-4 uppercase">Welcome to the Grind</h2>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight italic">
                            BUILD YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-white">LEGACY</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl">
                            Join the elite community of athletes who refuse to settle. Personalized workouts, progress tracking, and the motivation you need to crush your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="btn-primary text-center">
                                START YOUR JOURNEY
                            </Link>
                            <Link to="/about" className="px-6 py-2 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-black transition-all duration-300 text-center">
                                LEARN MORE
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats or Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-16 flex gap-12"
                    >
                        <div>
                            <p className="text-3xl font-heading font-bold text-white">500+</p>
                            <p className="text-gray-400 text-sm">Active Members</p>
                        </div>
                        <div>
                            <p className="text-3xl font-heading font-bold text-white">50+</p>
                            <p className="text-gray-400 text-sm">Programs</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
