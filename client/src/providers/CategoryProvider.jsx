import { useState, useEffect, useMemo, createContext } from "react";

export const CategoryContext = createContext();

function CategoryProvider({ children }) {
    const [categories, setCategories] = useState(null);
    
    
    const value = useMemo(() => (
        { 
            categories, 
            setCategories
        }), 
        [categories, setCategories]);


    return (
        <CategoryContext.Provider 
            value={value}>{children}
        </CategoryContext.Provider>
    )
}   

export default CategoryProvider