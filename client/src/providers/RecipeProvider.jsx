// src/providers/RecipeProvider.jsx
import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { getRecipes as apiGetRecipes } from "../api/api";
import { UserContext } from "./UserProvider";

export const RecipeContext = createContext();

function RecipeProvider({ children }) {
    // const { user } = useContext(UserContext); // Get user from UserProvider
    // const [recipes, setRecipes] = useState(null);
    // const [loading, setLoading] = useState(false);

    // // Fetch recipes when user changes
    // useEffect(() => {
    //     if (!user) {
    //         console.log('🍽️ [RecipeProvider] No user - clearing recipes');
    //         setRecipes(null);
    //         return;
    //     }

    //     console.log('🍽️ [RecipeProvider] User detected:', user.id, '- Fetching recipes...');
        
    //     const fetchRecipes = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await apiGetRecipes({ user_id: user.id });
    //             console.log('✅ [RecipeProvider] Recipes fetched:', data);
    //             setRecipes(data);
    //         } catch (error) {
    //             console.error('❌ [RecipeProvider] Error fetching recipes:', error);
    //             setRecipes([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchRecipes();
    // }, [user]); // Re-run when user changes

    // const value = useMemo(() => ({
    //     recipes,
    //     setRecipes,
    //     loading
    // }), [recipes, loading]);

    // return (
    //     <RecipeContext.Provider value={value}>
    //         {children}
    //     </RecipeContext.Provider>
    // );
}

export default RecipeProvider;