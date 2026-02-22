import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="bg-cream min-h-screen">
            {/* Header */}
            <div className="gradient-bg relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 py-14 text-center relative">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl font-bold text-white">Get in Touch</motion.h1>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="w-16 h-1 bg-accent rounded-full mx-auto mt-4" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Cards */}
                    <div className="space-y-4">
                        {[
                            { icon: Mail, title: 'Email', text: 'support@gymjerkss.com', color: 'text-accent', bg: 'bg-accent/10' },
                            { icon: Phone, title: 'Phone', text: '+91 98765 43210', color: 'text-teal', bg: 'bg-teal/10' },
                            { icon: MapPin, title: 'Address', text: 'Mumbai, Maharashtra, India', color: 'text-gold', bg: 'bg-gold/10' },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -3 }}
                                className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}>
                                    <item.icon className={`h-5 w-5 ${item.color}`} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">{item.title}</p>
                                    <p className="text-sm font-semibold text-navy">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Form */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="font-heading text-xl font-bold text-navy mb-6">Send us a message</h2>
                        {success && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-teal/10 border border-teal/30 text-teal rounded-xl p-4 text-sm mb-6 font-medium">
                                ✓ Message sent! We will get back to you soon.
                            </motion.div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="Your Name" className="input-field rounded-xl" />
                                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                    placeholder="Your Email" className="input-field rounded-xl" />
                            </div>
                            <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                placeholder="Your Message" className="input-field rounded-xl resize-none" />
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                                className="btn-accent px-8 py-3.5 rounded-xl flex items-center gap-2">
                                <Send className="h-4 w-4" /> Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
