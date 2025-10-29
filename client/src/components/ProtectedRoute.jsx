// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useUser } from '../providers';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useUser();

    if (loading) {
        console.log('⏳ [ProtectedRoute] Checking authentication...');
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        console.log('🔒 [ProtectedRoute] LOCKED - Not authenticated - redirecting to /login');
        return <Navigate to="/login" replace />;
    }

    console.log('🔓 [ProtectedRoute] UNLOCKED - Authenticated - showing protected content');
    return children;
}

export default ProtectedRoute;