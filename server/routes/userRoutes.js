const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    getAllUsers,
    deleteUser,
    toggleWishlist,
    getWishlist,
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', protect, adminOnly, getAllUsers);
router.delete('/:id', protect, adminOnly, deleteUser);
router.route('/wishlist').post(protect, toggleWishlist).get(protect, getWishlist);

module.exports = router;
