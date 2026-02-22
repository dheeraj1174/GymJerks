// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Admin
const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('No file uploaded');
        }
        res.json({
            url: req.file.path,
            public_id: req.file.filename,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { uploadImage };
