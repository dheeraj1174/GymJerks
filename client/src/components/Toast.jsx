import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const icons = { success: CheckCircle, error: AlertCircle, info: Info };
const colors = {
    success: 'bg-[#39ff14]/10 border-[#39ff14]/30 text-[#39ff14]',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
};

const Toast = ({ message, type = 'success', onClose }) => {
    const Icon = icons[type] || icons.info;
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(4px)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-2xl shadow-2xl ${colors[type]}`}
                >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{message}</span>
                    {onClose && (
                        <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
