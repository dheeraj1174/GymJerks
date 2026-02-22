import { useState } from 'react';
import { Trash2, Clock, Calendar, Loader2 } from 'lucide-react';
import api from '../utils/api';

const WORKOUT_COLORS = {
    Strength: 'border-l-blue-500',
    Cardio: 'border-l-orange-500',
    HIIT: 'border-l-red-500',
    Yoga: 'border-l-purple-500',
    CrossFit: 'border-l-yellow-500',
    Swimming: 'border-l-cyan-500',
    Cycling: 'border-l-green-500',
    Other: 'border-l-gray-500',
};

const WorkoutCard = ({ workout, onDelete }) => {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm('Delete this workout?')) return;
        setDeleting(true);
        try {
            await api.delete(`/workouts/${workout._id}`);
            onDelete(workout._id);
        } catch (error) {
            console.error('Error deleting workout:', error);
            alert('Failed to delete workout. Please try again.');
            setDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const borderColor = WORKOUT_COLORS[workout.type] || 'border-l-gray-500';

    return (
        <div className={`bg-white/5 border border-white/10 border-l-4 ${borderColor} rounded-lg p-5 hover:border-neon/30 transition-all duration-200 relative group`}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold text-white uppercase">{workout.type}</h4>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    title="Delete workout"
                >
                    {deleting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Trash2 className="h-5 w-5" />
                    )}
                </button>
            </div>

            <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-neon" />
                    <span>{workout.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-neon" />
                    <span>{formatDate(workout.date)}</span>
                </div>
            </div>

            {workout.notes && (
                <p className="text-gray-300 text-sm mt-2 border-t border-white/10 pt-2 line-clamp-2">
                    {workout.notes}
                </p>
            )}
        </div>
    );
};

export default WorkoutCard;
