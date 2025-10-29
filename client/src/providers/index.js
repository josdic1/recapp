// src/providers/index.js
import { useContext } from 'react';
import { UserContext } from './UserProvider';
import { CategoryContext } from './CategoryProvider';
// import { RecipeContext } from './RecipeProvider';  // Commented for now

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (!context) throw new Error('useCategories must be used within CategoryProvider');
    return context;
};

// Commented out for now - we'll add back later
// export const useRecipes = () => {
//     const context = useContext(RecipeContext);
//     if (!context) throw new Error('useRecipes must be used within RecipeProvider');
//     return context;
// };