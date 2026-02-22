const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        images: [{ type: String }],
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        originalPrice: { type: Number, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        sizes: [{ type: String }],
        colors: [{ type: String }],
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        tags: [{ type: String }], // 'bestseller', 'new-arrival', 'featured'
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', ProductSchema);
