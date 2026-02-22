const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
