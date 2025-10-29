import { useState, useEffect, useMemo, createContext } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    
    
    const value = useMemo(() => (
        { 
            user, 
            setUser
        }), 
        [user, setUser]);


    return (
        <UserContext.Provider 
            value={value}>{children}
        </UserContext.Provider>
    )
}   

export default UserProvider