// src/providers/UserProvider.jsx
import { useState, useEffect, useMemo, createContext } from "react";
import { checkSession, login as apiLogin, logout as apiLogout } from "../api/api";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check session when app loads
    useEffect(() => {
        console.log('🔵 [UserProvider] useEffect triggered - checking session on mount');
        
        const verifySession = async () => {
            try {
                console.log('🔵 [UserProvider] Calling checkSession API...');
                const data = await checkSession();
                console.log('✅ [UserProvider] Session check success:', data);
                setUser(data.user);
            } catch (error) {
                console.log('❌ [UserProvider] Session check failed - not logged in');
                setUser(null);
            } finally {
                setLoading(false);
                console.log('🔵 [UserProvider] Loading complete');
            }
        };
        
        verifySession();
    }, []);

    // Login function
    const login = async (name, password) => {
        console.log('🟢 [UserProvider.login] Called with:', { name, password: '****' });
        
        try {
            console.log('🟢 [UserProvider.login] Calling API login...');
            const data = await apiLogin(name, password);
            console.log('✅ [UserProvider.login] API login success:', data);
            
            console.log('🟢 [UserProvider.login] Setting user state:', data.user);
            setUser(data.user);
            
            console.log('✅ [UserProvider.login] Login complete!');
            return { success: true, user: data.user };
        } catch (error) {
            console.log('❌ [UserProvider.login] Login failed:', error.response?.data || error.message);
            return { 
                success: false, 
                error: error.response?.data?.error || 'Login failed' 
            };
        }
    };

    // Logout function
    const logout = async () => {
        console.log('🔴 [UserProvider.logout] Called');
        
        try {
            console.log('🔴 [UserProvider.logout] Calling API logout...');
            await apiLogout();
            console.log('✅ [UserProvider.logout] API logout success');
            
            console.log('🔴 [UserProvider.logout] Clearing user state');
            setUser(null);
            
            console.log('✅ [UserProvider.logout] Logout complete!');
            return { success: true };
        } catch (error) {
            console.log('❌ [UserProvider.logout] Logout failed:', error.message);
            return { success: false, error: error.message };
        }
    };

    const value = useMemo(() => {
        console.log('🔵 [UserProvider] useMemo recalculating value:', { user, loading });
        return {
            user,
            setUser,
            login,
            logout,
            loading,
            isAuthenticated: !!user
        };
    }, [user, loading]);

    // Show loading while checking session
    if (loading) {
        console.log('⏳ [UserProvider] Rendering loading state...');
        return <div>Checking session...</div>;
    }

    console.log('🔵 [UserProvider] Rendering with user:', user);
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;