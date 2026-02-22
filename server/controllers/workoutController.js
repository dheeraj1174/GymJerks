const Workout = require('../models/Workout');

// @desc    Get workouts for logged-in user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res, next) => {
    try {
        const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
        return res.status(200).json(workouts);
    } catch (error) {
        next(error);
    }
};

// @desc    Add a workout
// @route   POST /api/workouts
// @access  Private
const setWorkout = async (req, res, next) => {
    try {
        const { type, duration, notes } = req.body;

        if (!type || !duration) {
            return res.status(400).json({ message: 'Please provide workout type and duration' });
        }

        if (isNaN(duration) || Number(duration) <= 0) {
            return res.status(400).json({ message: 'Duration must be a positive number' });
        }

        const workout = await Workout.create({
            type,
            duration: Number(duration),
            notes: notes || '',
            user: req.user.id,
        });

        return res.status(201).json(workout);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res, next) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        if (workout.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this workout' });
        }

        await workout.deleteOne();
        return res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWorkouts,
    setWorkout,
    deleteWorkout,
};
