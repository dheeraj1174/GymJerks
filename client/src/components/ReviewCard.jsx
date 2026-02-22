import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
    return (
        <div className="glass rounded-2xl p-6 min-w-[320px] max-w-[380px] flex-shrink-0 hover:border-[#ccff00]/20 transition-colors duration-300">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                    />
                ))}
            </div>

            {/* Review text */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
                "{review.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ccff00] to-green-600 flex items-center justify-center text-black font-bold text-sm">
                    {review.name.charAt(0)}
                </div>
                <div>
                    <p className="text-white font-bold text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.title || 'Verified Buyer'}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
