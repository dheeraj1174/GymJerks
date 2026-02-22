const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const keyword = req.query.keyword
            ? { name: { $regex: req.query.keyword, $options: 'i' } }
            : {};

        const category = req.query.category && req.query.category !== 'All'
            ? { category: req.query.category }
            : {};

        const tag = req.query.tag
            ? { tags: req.query.tag }
            : {};

        const products = await Product.find({ ...keyword, ...category, ...tag });
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = async (req, res, next) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Admin
const createProduct = async (req, res, next) => {
    try {
        const { name, price, originalPrice, image, images, brand, category, countInStock, description, sizes, colors, tags } = req.body;
        const product = new Product({
            name,
            price,
            originalPrice: originalPrice || price,
            image,
            images: images || [],
            brand,
            category,
            countInStock,
            numReviews: 0,
            description,
            sizes: sizes || [],
            colors: colors || [],
            tags: tags || [],
            slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        const fields = ['name', 'price', 'originalPrice', 'image', 'images', 'brand', 'category', 'countInStock', 'description', 'sizes', 'colors', 'tags'];
        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                product[field] = req.body[field];
            }
        });

        if (req.body.name) {
            product.slug = req.body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product removed' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get product by ID (admin)
// @route   GET /api/products/id/:id
// @access  Admin
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductBySlug,
    getTopProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
};
