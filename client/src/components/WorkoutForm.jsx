import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import api from '../utils/api';

const WorkoutForm = ({ onWorkoutAdded }) => {
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const res = await api.post('/workouts', { type, duration, notes });
            onWorkoutAdded(res.data);
            setType('');
            setDuration('');
            setNotes('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add workout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark/50 border border-white/10 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-heading font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="text-neon" /> LOG WORKOUT
            </h3>
            {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/30 p-3 rounded">{error}</p>}
            {success && <p className="text-neon text-sm mb-4 bg-neon/10 border border-neon/30 p-3 rounded">✓ Workout logged successfully!</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Workout Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-colors"
                    >
                        <option value="">Select Type</option>
                        <option value="Strength">Strength Training</option>
                        <option value="Cardio">Cardio</option>
                        <option value="HIIT">HIIT</option>
                        <option value="Yoga">Yoga</option>
                        <option value="CrossFit">CrossFit</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Duration (minutes)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        min="1"
                        max="600"
                        placeholder="e.g. 45"
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Notes <span className="text-gray-600">(optional)</span></label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Details about your session..."
                        rows="3"
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-colors resize-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 btn-primary font-heading uppercase py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <><Loader2 className="h-5 w-5 animate-spin" /> Adding...</>
                    ) : (
                        'Add Workout'
                    )}
                </button>
            </form>
        </div>
    );
};

export default WorkoutForm;
