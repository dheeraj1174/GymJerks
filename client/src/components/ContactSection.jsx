import { Mail, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
    return (
        <div id="contact" className="py-20 bg-dark w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4 italic">
                        GET IN <span className="text-neon">TOUCH</span>
                    </h2>
                    <p className="text-gray-400 text-lg">We're here to help. Reach out anytime.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Empty space or inputs if needed, design shows stacked inputs */}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="sr-only">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="YOUR NAME"
                                    className="w-full bg-white/5 border border-white/10 rounded p-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                                />
                            </div>
                            <div>
                                <label className="sr-only">Your Email</label>
                                <input
                                    type="email"
                                    placeholder="YOUR EMAIL"
                                    className="w-full bg-white/5 border border-white/10 rounded p-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                                />
                            </div>
                            <div>
                                <label className="sr-only">Your Message</label>
                                <textarea
                                    rows="6"
                                    placeholder="YOUR MESSAGE"
                                    className="w-full bg-white/5 border border-white/10 rounded p-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                                ></textarea>
                            </div>
                        </div>
                        <button className="w-full bg-neon text-black font-bold font-heading text-xl py-4 rounded hover:bg-white transition-colors duration-300">
                            SEND MESSAGE
                        </button>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-8 rounded flex items-start gap-4 hover:border-neon/50 transition-colors">
                            <div className="bg-neon/10 p-3 rounded text-neon">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">EMAIL</h3>
                                <p className="text-gray-400">support@gymjerks.com</p>
                                <p className="text-gray-400">orders@gymjerks.com</p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-8 rounded flex items-start gap-4 hover:border-neon/50 transition-colors">
                            <div className="bg-neon/10 p-3 rounded text-neon">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">PHONE</h3>
                                <p className="text-gray-400">+1 (555) 123-4567</p>
                                <p className="text-gray-400 text-sm mt-1">Mon-Fri: 9AM-5PM EST</p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-8 rounded flex items-start gap-4 hover:border-neon/50 transition-colors">
                            <div className="bg-neon/10 p-3 rounded text-neon">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">HEADQUARTERS</h3>
                                <p className="text-gray-400">123 Iron Street</p>
                                <p className="text-gray-400">Gainsville, FL 32601</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
