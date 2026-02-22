import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
