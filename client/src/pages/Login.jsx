import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = await login({ email: form.email, password: form.password });
        setLoading(false);
        if (result.success) navigate('/'); else setError(result.error);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }} className="w-full max-w-md">
                <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="text-center mb-8">
                        <Link to="/" className="font-heading text-2xl font-bold">
                            <span className="text-[#39ff14]">GYM</span><span className="text-white">JERKSS</span>
                        </Link>
                        <p className="text-white/30 text-sm mt-2">Welcome back, lifter</p>
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm mb-6">{error}</motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-white/70 mb-1.5 block">Email</label>
                            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-[#39ff14] focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-white/70 mb-1.5 block">Password</label>
                            <div className="relative">
                                <input required type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-[#39ff14] focus:outline-none transition-colors pr-10" />
                                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                            className="w-full bg-[#39ff14] text-[#0a0a0a] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(57,255,20,0.3)] transition-all disabled:opacity-50">
                            {loading ? 'Signing in...' : <><LogIn className="h-4 w-4" /> Sign In</>}
                        </motion.button>
                    </form>
                    <p className="text-center text-sm text-white/30 mt-6">
                        New here? <Link to="/register" className="text-[#39ff14] font-semibold hover:underline">Create account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
