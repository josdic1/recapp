// src/providers/CategoryProvider.jsx
import { useState, useEffect, useMemo, createContext } from "react";
import { getCategories as apiGetCategories, createCategory as apiCreateCategory } from "../api/api";

export const CategoryContext = createContext();

function CategoryProvider({ children }) {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await apiGetCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const onCreateCategory = async (name) => {
        try {
            const data = await apiCreateCategory(name);
            setCategories(prevCategories => 
                prevCategories ? [...prevCategories, data] : [data]
            );
            return { success: true, category: data };
        } catch (error) {
            console.error('Error creating category:', error);
            return { 
                success: false, 
                error: error.response?.data?.error || error.message 
            };
        }
    };

    const value = useMemo(() => ({
        categories,
        setCategories,
        onCreateCategory,
        loading
    }), [categories, loading]);

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryProvider;