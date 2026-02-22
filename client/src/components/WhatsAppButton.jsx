import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

const WhatsAppButton = () => {
    const message = encodeURIComponent('Hi! I\'m interested in GYMJERKSS products. Can you help me?');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="relative">
                {/* Pulse ring */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>

                {/* Button */}
                <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-400 hover:scale-110 transition-all duration-300">
                    <MessageCircle className="h-6 w-6 text-white fill-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-white text-black text-xs font-bold px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                        Chat with us!
                        <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white rotate-45"></div>
                    </div>
                </div>
            </div>
        </a>
    );
};

// Utility: generate WhatsApp URL with product details
export const getWhatsAppProductUrl = (product, size = '', color = '') => {
    const message = encodeURIComponent(
        `Hi! I'd like to order:\n\n` +
        `*${product.name}*\n` +
        `${size ? `Size: ${size}\n` : ''}` +
        `${color ? `Color: ${color}\n` : ''}` +
        `Price: ₹${product.price}\n\n` +
        `Please confirm availability.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

export default WhatsAppButton;
