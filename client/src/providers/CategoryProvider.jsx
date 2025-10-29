// src/providers/CategoryProvider.jsx
import { useState, useEffect, useMemo, createContext } from "react";
import { getCategories as apiGetCategories } from "../api/api";

export const CategoryContext = createContext();

function CategoryProvider({ children }) {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);

    // THIS IS THE IMPORTANT PART - fetches categories on mount
    useEffect(() => {
        console.log('📁 [CategoryProvider] Fetching categories...');
        
        const fetchCategories = async () => {
            try {
                const data = await apiGetCategories();
                console.log('✅ [CategoryProvider] Categories fetched:', data);
                setCategories(data);
            } catch (error) {
                console.error('❌ [CategoryProvider] Error fetching categories:', error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // Empty array = run once on mount

    const value = useMemo(() => ({
        categories,
        setCategories,
        loading
    }), [categories, loading]);

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryProvider;