// src/providers/UserProvider.jsx
import { useState, useEffect, createContext, useMemo } from 'react';
import { checkSession, logout as apiLogout } from '../api/api';

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const data = await checkSession();
                setUser(data.user);
            } catch (error) {
                console.error('Session check failed:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const logout = async () => {
        try {
            await apiLogout();  // Call backend
            setUser(null);      // Clear state
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const value = useMemo(() => ({
        user,
        setUser,
        loading,
        logout,
        isAuthenticated: !!user  // ← ADD THIS
    }), [user, loading]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;