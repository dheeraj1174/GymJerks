import { useState } from 'react';

const ImageGallery = ({ images = [], name = '' }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

    const displayImages = images.length > 0 ? images : ['https://via.placeholder.com/600'];

    const handleMouseMove = (e) => {
        if (!isZoomed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPos({ x, y });
    };

    return (
        <div className="space-y-4">
            {/* Main image */}
            <div
                className="aspect-[4/5] bg-[#111] rounded-2xl overflow-hidden border border-white/5 relative group cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
            >
                <img
                    src={displayImages[activeIndex]}
                    alt={`${name} - ${activeIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={isZoomed ? {
                        transform: 'scale(2)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    } : {}}
                    loading="lazy"
                />
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                    {activeIndex + 1} / {displayImages.length}
                </div>
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                    {displayImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${activeIndex === i
                                    ? 'border-[#ccff00] shadow-lg shadow-[#ccff00]/10 scale-105'
                                    : 'border-white/10 opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img src={img} alt={`${name} thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
