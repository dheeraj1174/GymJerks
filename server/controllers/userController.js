const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            phone: phone || '',
        });

        if (user) {
            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user.id),
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user.id),
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Admin
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle wishlist item
// @route   POST /api/users/wishlist
// @access  Private
const toggleWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);

        const index = user.wishlist.indexOf(productId);
        if (index > -1) {
            user.wishlist.splice(index, 1);
        } else {
            user.wishlist.push(productId);
        }

        await user.save();
        res.json(user.wishlist);
    } catch (error) {
        next(error);
    }
};

// @desc    Get wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.json(user.wishlist);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers,
    deleteUser,
    toggleWishlist,
    getWishlist,
};
