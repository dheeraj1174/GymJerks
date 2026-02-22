import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = await register(form.name, form.email, form.password);
        setLoading(false);
        if (result.success) navigate('/'); else setError(result.message);
    };

    return (
        <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 py-20">
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }} className="w-full max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <div className="text-center mb-8">
                        <Link to="/" className="font-heading text-2xl font-bold">
                            <span className="text-accent">GYM</span><span className="text-navy">JERKSS</span>
                        </Link>
                        <p className="text-gray-400 text-sm mt-2">Join the GYMJERKSS family</p>
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm mb-6">{error}</motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-navy mb-1.5 block">Name</label>
                            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                placeholder="Your full name" className="input-field rounded-xl" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-navy mb-1.5 block">Email</label>
                            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                placeholder="you@example.com" className="input-field rounded-xl" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-navy mb-1.5 block">Password</label>
                            <div className="relative">
                                <input required type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                                    placeholder="Create password" className="input-field rounded-xl pr-10" minLength={6} />
                                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                            className="w-full btn-accent py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                            {loading ? 'Creating...' : <><UserPlus className="h-4 w-4" /> Create Account</>}
                        </motion.button>
                    </form>
                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account? <Link to="/login" className="text-accent font-semibold hover:text-accent-light">Sign in</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
