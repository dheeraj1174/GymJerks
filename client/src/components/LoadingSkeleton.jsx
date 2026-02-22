const ProductCardSkeleton = () => (
    <div className="rounded-xl overflow-hidden border border-white/5 bg-[#111]">
        <div className="aspect-[4/5] skeleton"></div>
        <div className="p-5 space-y-3">
            <div className="flex justify-between">
                <div className="skeleton h-5 w-3/4"></div>
                <div className="skeleton h-5 w-10"></div>
            </div>
            <div className="skeleton h-3 w-1/3"></div>
            <div className="flex justify-between items-end">
                <div className="skeleton h-6 w-16"></div>
                <div className="flex gap-1">
                    <div className="skeleton h-4 w-6"></div>
                    <div className="skeleton h-4 w-6"></div>
                    <div className="skeleton h-4 w-6"></div>
                </div>
            </div>
        </div>
    </div>
);

const ProductDetailSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-4">
            <div className="aspect-[4/5] skeleton rounded-2xl"></div>
            <div className="flex gap-3">
                {[1, 2, 3].map(n => (
                    <div key={n} className="w-20 h-20 skeleton rounded-lg"></div>
                ))}
            </div>
        </div>
        <div className="space-y-6">
            <div className="skeleton h-10 w-3/4"></div>
            <div className="skeleton h-5 w-1/3"></div>
            <div className="skeleton h-8 w-24"></div>
            <div className="skeleton h-5 w-20"></div>
            <div className="space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-2/3"></div>
            </div>
            <div className="flex gap-3">
                {[1, 2, 3, 4].map(n => (
                    <div key={n} className="skeleton h-12 w-14 rounded"></div>
                ))}
            </div>
            <div className="flex gap-4">
                <div className="skeleton h-14 w-32 rounded-lg"></div>
                <div className="skeleton h-14 flex-1 rounded-lg"></div>
            </div>
        </div>
    </div>
);

const TextSkeleton = ({ lines = 3, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className={`skeleton h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}></div>
        ))}
    </div>
);

const TableRowSkeleton = ({ cols = 5 }) => (
    <tr>
        {Array.from({ length: cols }).map((_, i) => (
            <td key={i} className="px-6 py-4">
                <div className="skeleton h-4 w-full"></div>
            </td>
        ))}
    </tr>
);

export { ProductCardSkeleton, ProductDetailSkeleton, TextSkeleton, TableRowSkeleton };
